import mysql from 'mysql2/promise';

// Import necessary types from mysql2
import { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';

// Update interfaces to extend RowDataPacket
export interface PortfolioItem extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
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

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to ensure database connection
async function ensureConnection() {
  try {
    await pool.query('SELECT 1');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Unable to connect to the database');
  }
}

// Function to get all portfolio items
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  await ensureConnection();
  initializeTables();
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

// Function to add a new portfolio item
export async function addPortfolioItem(title: string, description: string, category: string, imageUrl: string): Promise<PortfolioItem> {
  await ensureConnection();
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO portfolio_items (title, description, category, image) VALUES (?, ?, ?, ?)',
    [title, description, category, imageUrl]
  );
  const [newItem] = await pool.query<PortfolioItem[]>('SELECT * FROM portfolio_items WHERE id = ?', [result.insertId]);
  return newItem[0];
}

// Function to update an existing portfolio item
export async function updatePortfolioItem(id: number, title: string, description: string, category: string, imageUrl: string): Promise<PortfolioItem | null> {
  await ensureConnection();
  await pool.query<ResultSetHeader>(
    'UPDATE portfolio_items SET title = ?, description = ?, category = ?, image = ? WHERE id = ?',
    [title, description, category, imageUrl, id]
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
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
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

// Initialize all tables
export async function initializeTables(): Promise<void> {
  await createPortfolioTable();
  await createResumeTable();
  await createBlogTable();
}

// Function to test the database connection
export async function testDatabaseConnection(): Promise<void> {
  try {
    await ensureConnection();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

