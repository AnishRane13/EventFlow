const pool = require("../../db/db");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  const query = `
    SELECT 
      user_id,
      name,
      email,
      phone_number,
      role,
      created_at,
      updated_at
    FROM users
    ORDER BY created_at DESC`;

  const result = await pool.query(query);
  return result.rows;
};

const createUser = async (name, email, password, phone_number, role) => {
  // Generate password hash
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const query = `
    INSERT INTO users (
      name,
      email,
      password_hash,
      phone_number,
      role,
      created_at,
      updated_at
    ) 
    VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING 
      user_id,
      name,
      email,
      phone_number,
      role,
      created_at,
      updated_at`;

  const values = [name, email, password_hash, phone_number, role];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getAllUsers, createUser };
