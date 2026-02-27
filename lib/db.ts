import { MongoClient, type Db, ObjectId, type WithId, type Document } from "mongodb"
import fs from "fs/promises"
import path from "path"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(process.env.MONGODB_DB)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export interface PortfolioItem {
  _id: string
  title: string
  description: string
  image: string
  category: string
  type: "project" | "course" | "thesis"
  created_at: Date
}

export interface ResumeItem {
  _id: string
  type: "experience" | "education"
  title: string
  description: string
  date: string
  created_at: Date
}

export interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  created_at: Date
}

export interface Message {
  _id: string
  name: string
  email: string
  message: string
  created_at: Date
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const { db } = await connectToDatabase()
  const items = await db.collection("portfolio_items").find().sort({ created_at: -1 }).toArray()
  return items.map((item: WithId<Document>) => ({
    _id: item._id.toString(),
    title: item.title as string,
    description: item.description as string,
    image: item.image as string,
    category: item.category as string,
    type: item.type as "project" | "course" | "thesis",
    created_at: item.created_at as Date,
  }))
}

export async function addPortfolioItem(item: Omit<PortfolioItem, "_id" | "created_at">): Promise<PortfolioItem> {
  const { db } = await connectToDatabase()
  const result = await db.collection("portfolio_items").insertOne({
    ...item,
    created_at: new Date(),
  })
  return {
    _id: result.insertedId.toString(),
    ...item,
    created_at: new Date(),
  }
}

export async function updatePortfolioItem(
  id: string,
  item: Partial<Omit<PortfolioItem, "_id" | "created_at">>,
): Promise<PortfolioItem | null> {
  const { db } = await connectToDatabase()

  // Fetch the current item to get the old image filename
  const currentItem = await db.collection("portfolio_items").findOne({ _id: new ObjectId(id) })

  const result = await db
    .collection("portfolio_items")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: item }, { returnDocument: "after" })

  if (result && result.value) {
    // If there's a new image and it's different from the old one, delete the old image
    if (item.image && currentItem && currentItem.image !== item.image) {
      await deleteImage(currentItem.image)
    }

    return {
      _id: result.value._id.toString(),
      title: result.value.title,
      description: result.value.description,
      image: result.value.image,
      category: result.value.category,
      type: result.value.type,
      created_at: result.value.created_at,
    }
  }
  return null
}

export async function deletePortfolioItem(id: string): Promise<boolean> {
  const { db } = await connectToDatabase()

  // Fetch the item to get the image filename
  const item = await db.collection("portfolio_items").findOne({ _id: new ObjectId(id) })

  if (item) {
    const result = await db.collection("portfolio_items").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 1) {
      // Delete the associated image file
      await deleteImage(item.image)
      return true
    }
  }

  return false
}

export async function getResumeItems(): Promise<ResumeItem[]> {
  const { db } = await connectToDatabase()
  const items = await db.collection("resume_items").find().sort({ date: -1 }).toArray()
  return items.map((item: WithId<Document>) => ({
    _id: item._id.toString(),
    type: item.type as "experience" | "education",
    title: item.title as string,
    description: item.description as string,
    date: item.date as string,
    created_at: item.created_at as Date,
  }))
}

export async function addResumeItem(item: Omit<ResumeItem, "_id" | "created_at">): Promise<ResumeItem> {
  const { db } = await connectToDatabase()
  const result = await db.collection("resume_items").insertOne({
    ...item,
    created_at: new Date(),
  })
  return {
    _id: result.insertedId.toString(),
    ...item,
    created_at: new Date(),
  }
}

export async function updateResumeItem(
  id: string,
  item: Partial<Omit<ResumeItem, "_id" | "created_at">>,
): Promise<ResumeItem | null> {
  const { db } = await connectToDatabase()
  const result = await db
    .collection("resume_items")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: item }, { returnDocument: "after" })
  if (result && result.value) {
    return {
      _id: result.value._id.toString(),
      type: result.value.type,
      title: result.value.title,
      description: result.value.description,
      date: result.value.date,
      created_at: result.value.created_at,
    }
  }
  return null
}

export async function deleteResumeItem(id: string): Promise<boolean> {
  const { db } = await connectToDatabase()
  const result = await db.collection("resume_items").deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount === 1
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { db } = await connectToDatabase()
  const posts = await db.collection("blog_posts").find().sort({ created_at: -1 }).toArray()
  return posts.map((post: WithId<Document>) => ({
    _id: post._id.toString(),
    title: post.title as string,
    excerpt: post.excerpt as string,
    content: post.content as string,
    created_at: post.created_at as Date,
  }))
}

export async function addBlogPost(post: Omit<BlogPost, "_id" | "created_at">): Promise<BlogPost> {
  const { db } = await connectToDatabase()
  const result = await db.collection("blog_posts").insertOne({
    ...post,
    created_at: new Date(),
  })
  return {
    _id: result.insertedId.toString(),
    ...post,
    created_at: new Date(),
  }
}

export async function updateBlogPost(
  id: string,
  post: Partial<Omit<BlogPost, "_id" | "created_at">>,
): Promise<BlogPost | null> {
  const { db } = await connectToDatabase()
  const result = await db
    .collection("blog_posts")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: post }, { returnDocument: "after" })
  if (result && result.value) {
    return {
      _id: result.value._id.toString(),
      title: result.value.title,
      excerpt: result.value.excerpt,
      content: result.value.content,
      created_at: result.value.created_at,
    }
  }
  return null
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const { db } = await connectToDatabase()
  const result = await db.collection("blog_posts").deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount === 1
}

export async function getMessages(): Promise<Message[]> {
  const { db } = await connectToDatabase()
  const messages = await db.collection("messages").find().sort({ created_at: -1 }).toArray()
  return messages.map((message: WithId<Document>) => ({
    _id: message._id.toString(),
    name: message.name as string,
    email: message.email as string,
    message: message.message as string,
    created_at: message.created_at as Date,
  }))
}

export async function addMessage(message: Omit<Message, "_id" | "created_at">): Promise<Message> {
  const { db } = await connectToDatabase()
  const result = await db.collection("messages").insertOne({
    ...message,
    created_at: new Date(),
  })
  return {
    _id: result.insertedId.toString(),
    ...message,
    created_at: new Date(),
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  const { db } = await connectToDatabase()
  const result = await db.collection("messages").deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount === 1
}

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { client } = await connectToDatabase()
    await client.db().command({ ping: 1 })
    return true
  } catch (error) {
    console.error("Failed to connect to the database:", error)
    return false
  }
}

let isInitialized = false

export async function initializeDatabase(): Promise<void> {
  if (isInitialized) return

  const { db } = await connectToDatabase()
  const collections = ["portfolio_items", "resume_items", "blog_posts", "messages"]

  for (const collection of collections) {
    if (!(await db.listCollections({ name: collection }).hasNext())) {
      await db.createCollection(collection)
      console.log(`Created collection: ${collection}`)
    }
  }

  isInitialized = true
}

async function deleteImage(filename: string): Promise<void> {
  if (!filename) return

  const imagePath = path.join(process.cwd(), "public", "portfolio-images", filename)
  try {
    await fs.unlink(imagePath)
    console.log(`Deleted image: ${filename}`)
  } catch (error) {
    console.error(`Error deleting image ${filename}:`, error)
  }
}

