const pool = require("../../db/db");
const bcrypt = require("bcryptjs");

const getAllEvents = async () => {
  const query = `
    SELECT 
      event_id,
      organizer_id,
      name,
      description,
      venue,
      date,
      time,
      banner_url,
      created_at,
      updated_at
    FROM events
    ORDER BY created_at DESC`;

  const result = await pool.query(query);
  return result.rows;
};

const getEventByIdoftheOrganizer = async (organizer_id) => {
    const query = `
        SELECT * FROM events WHERE organizer_id = $1
    `;
    const result = await pool.query(query, [organizer_id]);
    return result.rows[0];
}

const getEventById = async (event_id) => {
    const query = `
        SELECT * FROM events WHERE event_id = $1
    `;
    const result = await pool.query(query, [event_id]);
    return result.rows[0];
}

const createEvent = async (organizer_id, name, description, venue, date, time, banner_url) => {
    const query = `
        INSERT INTO events (organizer_id, name, description, venue, date, time, banner_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;  
    const result = await pool.query(query, [organizer_id, name, description, venue, date, time, banner_url]);
    return result.rows[0];
}

module.exports = { getAllEvents, getEventByIdoftheOrganizer, createEvent, getEventById };
