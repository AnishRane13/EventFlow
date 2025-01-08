-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    role VARCHAR(20) CHECK (role IN ('organizer', 'attendee')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    organizer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    venue VARCHAR(255),
    date DATE NOT NULL,
    time TIME NOT NULL,
    banner_url BYTEA,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tickets Table
CREATE TABLE tickets (
    ticket_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('Early Bird', 'VIP', 'General')) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity_available INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ticket Purchases Table
CREATE TABLE ticket_purchases (
    purchase_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    ticket_id INT REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    qr_code TEXT NOT NULL,
    payment_status VARCHAR(20) CHECK (payment_status IN ('Pending', 'Completed', 'Failed')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Discount Codes Table
CREATE TABLE discount_codes (
    discount_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percentage DECIMAL(5, 2) NOT NULL,
    max_uses INT NOT NULL,
    uses INT DEFAULT 0,
    valid_until DATE NOT NULL
);

-- Feedback Table
CREATE TABLE feedback (
    feedback_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Attendees Table
CREATE TABLE event_attendees (
    attendee_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    checked_in BOOLEAN DEFAULT FALSE,
    checked_in_time TIMESTAMP
);

-- Live Q&A Table
CREATE TABLE live_qa (
    qa_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live Q&A Answers Table
CREATE TABLE live_qa_answers (
    answer_id SERIAL PRIMARY KEY,
    qa_id INT REFERENCES live_qa(qa_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live Q&A Votes Table
CREATE TABLE live_qa_votes (
    vote_id SERIAL PRIMARY KEY,
    qa_id INT REFERENCES live_qa(qa_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live Polls Table
CREATE TABLE live_polls (
    poll_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live Poll Options Table
CREATE TABLE live_poll_options (
    option_id SERIAL PRIMARY KEY,
    poll_id INT REFERENCES live_polls(poll_id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live Poll Votes Table
CREATE TABLE live_poll_votes (
    vote_id SERIAL PRIMARY KEY,
    poll_id INT REFERENCES live_polls(poll_id) ON DELETE CASCADE,
    option_id INT REFERENCES live_poll_options(option_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_purchases_user ON ticket_purchases(user_id);
CREATE INDEX idx_purchases_ticket ON ticket_purchases(ticket_id);
CREATE INDEX idx_feedback_event ON feedback(event_id);
CREATE INDEX idx_feedback_user ON feedback(user_id);
CREATE INDEX idx_attendees_event ON event_attendees(event_id);
CREATE INDEX idx_attendees_user ON event_attendees(user_id);
CREATE INDEX idx_live_qa_event ON live_qa(event_id);
CREATE INDEX idx_live_polls_event ON live_polls(event_id);
CREATE INDEX idx_poll_votes_poll ON live_poll_votes(poll_id);
CREATE INDEX idx_poll_votes_user ON live_poll_votes(user_id);
