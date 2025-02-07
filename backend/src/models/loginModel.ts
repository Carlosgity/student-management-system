import pool from '../config/db';

interface User {
  id?: number;
  username: string;
  password: string;
}

// Function to get user by username and password
export const getUserByCredentials = async (username: string, password: string): Promise<User | null> => {
  const result = await pool.query(
    'SELECT * FROM "loginInfo" WHERE username = $1 AND password = $2',
    [username, password]
  );
  return result.rows[0] || null;
};
