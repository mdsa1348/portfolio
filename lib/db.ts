import mysql from 'mysql2/promise';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Update interfaces to extend RowDataPacket
export interface PortfolioItem extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  type: 'project' | 'course' | 'thesis';
  created_at: Date;
}

export interface ResumeItem extends RowDataPacket {
  id: number;
  type: 'experience' | 'education';
  title: string;
  description: string;
  date: string;
  created_at: Date;
}

export interface BlogPost extends RowDataPacket {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  created_at: Date;
}

export interface Message extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: Date;
}

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'sql12.freesqldatabase.com',
  user: process.env.MYSQL_USER || 'sql12755218',
  password: process.env.MYSQL_PASSWORD || '5GWDNIcxn3',
  database: process.env.MYSQL_DATABASE || 'sql12755218',
  connectTimeout: 30000,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to fetch portfolio items from the database
async function ensureConnection() {
  try {
    // Execute the query to fetch portfolio items
    const [rows] = await pool.query('SELECT * FROM portfolio_items ORDER BY created_at DESC');
    return rows; // Return the fetched rows
  } catch (error) {
    // Log the error and throw a new error
    console.error('Error fetching portfolio items from the database:', error);
    throw new Error('Unable to fetch portfolio items from the database');
  }
}

// Function to get all portfolio items (projects and courses)
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  await ensureConnection();
  const [rows] = await pool.query<PortfolioItem[]>('SELECT * FROM portfolio_items ORDER BY created_at DESC');
  return rows;
}

// Function to get all resume items
export async function getResumeItems(): Promise<ResumeItem[]> {
  await ensureConnection();
  const [rows] = await pool.query<ResumeItem[]>('SELECT * FROM resume_items ORDER BY date DESC');
  return rows;
}

// Function to get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  await ensureConnection();
  const [rows] = await pool.query<BlogPost[]>('SELECT * FROM blog_posts ORDER BY created_at DESC');
  return rows;
}

// Function to add a new portfolio item (project or course)
export async function addPortfolioItem(title: string, description: string, category: string, image: string, type: 'project' | 'course'): Promise<PortfolioItem> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO portfolio_items (title, description, category, image, type) VALUES (?, ?, ?, ?, ?)',
    [title, description, category, image, type]
  );
  const [newItem] = await pool.query<PortfolioItem[]>('SELECT * FROM portfolio_items WHERE id = ?', [result.insertId]);
  return newItem[0];
}

// Function to update an existing portfolio item
export async function updatePortfolioItem(id: number, title: string, description: string, category: string, image: string, type: 'project' | 'course'): Promise<PortfolioItem | null> {
  await ensureConnection();
  await pool.query<ResultSetHeader>(
    'UPDATE portfolio_items SET title = ?, description = ?, category = ?, image = ?, type = ? WHERE id = ?',
    [title, description, category, image, type, id]
  );
  const [updatedItem] = await pool.query<PortfolioItem[]>('SELECT * FROM portfolio_items WHERE id = ?', [id]);
  return updatedItem[0] || null;
}

// Function to delete a portfolio item
export async function deletePortfolioItem(id: number): Promise<boolean> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM portfolio_items WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

// Function to add a new resume item
export async function addResumeItem(type: 'experience' | 'education', title: string, description: string, date: string): Promise<ResumeItem> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO resume_items (type, title, description, date) VALUES (?, ?, ?, ?)',
    [type, title, description, date]
  );
  const [newItem] = await pool.query<ResumeItem[]>('SELECT * FROM resume_items WHERE id = ?', [result.insertId]);
  return newItem[0];
}

// Function to update an existing resume item
export async function updateResumeItem(id: number, type: 'experience' | 'education', title: string, description: string, date: string): Promise<ResumeItem | null> {
  await ensureConnection();
  await pool.query<ResultSetHeader>(
    'UPDATE resume_items SET type = ?, title = ?, description = ?, date = ? WHERE id = ?',
    [type, title, description, date, id]
  );
  const [updatedItem] = await pool.query<ResumeItem[]>('SELECT * FROM resume_items WHERE id = ?', [id]);
  return updatedItem[0] || null;
}

// Function to delete a resume item
export async function deleteResumeItem(id: number): Promise<boolean> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM resume_items WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

// Function to add a new blog post
export async function addBlogPost(title: string, excerpt: string, content: string): Promise<BlogPost> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO blog_posts (title, excerpt, content) VALUES (?, ?, ?)',
    [title, excerpt, content]
  );
  const [newPost] = await pool.query<BlogPost[]>('SELECT * FROM blog_posts WHERE id = ?', [result.insertId]);
  return newPost[0];
}

// Function to update an existing blog post
export async function updateBlogPost(id: number, title: string, excerpt: string, content: string): Promise<BlogPost | null> {
  await ensureConnection();
  await pool.query<ResultSetHeader>(
    'UPDATE blog_posts SET title = ?, excerpt = ?, content = ? WHERE id = ?',
    [title, excerpt, content, id]
  );
  const [updatedPost] = await pool.query<BlogPost[]>('SELECT * FROM blog_posts WHERE id = ?', [id]);
  return updatedPost[0] || null;
}

// Function to delete a blog post
export async function deleteBlogPost(id: number): Promise<boolean> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM blog_posts WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

// Function to create the portfolio table if it doesn't exist
export async function createPortfolioTable(): Promise<void> {
  await ensureConnection();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      image VARCHAR(255) NOT NULL,
      type ENUM('project', 'course', 'thesis') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Add or modify the type column if it doesn't exist
  await pool.query(`
    ALTER TABLE portfolio_items
    MODIFY COLUMN type ENUM('project', 'course', 'thesis') NOT NULL DEFAULT 'project'
  `);
}

// Function to create the resume table if it doesn't exist
export async function createResumeTable(): Promise<void> {
  await ensureConnection();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS resume_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type ENUM('experience', 'education') NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      date VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Function to create the blog table if it doesn't exist
export async function createBlogTable(): Promise<void> {
  await ensureConnection();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Function to add a new message
export async function addMessage(name: string, email: string, message: string): Promise<Message> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
    [name, email, message]
  );
  const [newMessage] = await pool.query<Message[]>('SELECT * FROM messages WHERE id = ?', [result.insertId]);
  return newMessage[0];
}

export async function getMessages(): Promise<Message[]> {
  await ensureConnection();
  await createMessagesTable(); // Ensure the table exists
  const [rows] = await pool.query<Message[]>('SELECT * FROM messages ORDER BY created_at DESC');
  return rows;
}

// Function to create the messages table if it doesn't exist
export async function createMessagesTable(): Promise<void> {
  await ensureConnection();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Initialize all tables
export async function initializeTables(): Promise<void> {
  await createPortfolioTable();
  await createResumeTable();
  await createBlogTable();
  await createMessagesTable();
}

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection()
    connection.release()
    return true
  } catch (error) {
    console.error('Failed to connect to the database:', error)
    return false
  }
}

export async function deleteMessage(id: number): Promise<boolean> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM messages WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

