-- Insert sample users (organizers and attendees)
INSERT INTO users (name, email, password_hash, phone_number, role) VALUES
('John Doe', 'john.doe@email.com', 'hashed_password_1', '+1234567890', 'organizer'),
('Jane Smith', 'jane.smith@email.com', 'hashed_password_2', '+1234567891', 'organizer'),
('Bob Wilson', 'bob.wilson@email.com', 'hashed_password_3', '+1234567892', 'attendee'),
('Alice Brown', 'alice.brown@email.com', 'hashed_password_4', '+1234567893', 'attendee');

-- Insert sample events
INSERT INTO events (organizer_id, name, description, venue, date, time) VALUES
(1, 'Tech Conference 2025', 'Annual technology conference', 'Convention Center', '2025-03-15', '09:00:00'),
(2, 'Music Festival', 'Summer music festival', 'Central Park', '2025-07-20', '14:00:00');

-- Insert ticket types for events
INSERT INTO tickets (event_id, type, price, quantity_available) VALUES
(1, 'Early Bird', 99.99, 100),
(1, 'VIP', 299.99, 50),
(1, 'General', 149.99, 200),
(2, 'Early Bird', 79.99, 150),
(2, 'VIP', 199.99, 75),
(2, 'General', 129.99, 300);

-- Insert sample ticket purchases
INSERT INTO ticket_purchases (user_id, ticket_id, quantity, total_price, qr_code, payment_status) VALUES
(3, 1, 2, 199.98, 'QR_CODE_HASH_1', 'Completed'),
(4, 2, 1, 299.99, 'QR_CODE_HASH_2', 'Completed');

-- Insert discount codes
INSERT INTO discount_codes (event_id, code, discount_percentage, max_uses, valid_until) VALUES
(1, 'EARLY25', 25.00, 50, '2025-02-28'),
(2, 'SUMMER20', 20.00, 100, '2025-06-30');

-- Insert event attendees
INSERT INTO event_attendees (event_id, user_id, checked_in) VALUES
(1, 3, false),
(1, 4, false);

-- Insert feedback for past events
INSERT INTO feedback (user_id, event_id, rating, comments) VALUES
(3, 1, 5, 'Excellent event! Very well organized.'),
(4, 1, 4, 'Great speakers and networking opportunities.');

-- Insert live polls
INSERT INTO live_polls (event_id, question, is_active) VALUES
(1, 'What topic would you like to explore next?', true);

-- Insert live poll options
INSERT INTO live_poll_options (poll_id, option_text) VALUES
(1, 'Artificial Intelligence'),
(1, 'Blockchain'),
(1, 'Cloud Computing'),
(1, 'Cybersecurity');

-- Insert live poll votes
INSERT INTO live_poll_votes (poll_id, option_id, user_id) VALUES
(1, 1, 3),
(1, 2, 4);

-- Insert live Q&A questions
INSERT INTO live_qa (event_id, user_id, content, is_approved) VALUES
(1, 3, 'What are your thoughts on the future of remote work?', true),
(1, 4, 'How do you see AI impacting job markets in the next 5 years?', true);

-- Insert live Q&A answers
INSERT INTO live_qa_answers (qa_id, user_id, content) VALUES
(1, 1, 'Remote work will continue to evolve with better collaboration tools.'),
(2, 2, 'AI will create new job opportunities while automating routine tasks.');

-- Insert live Q&A votes
INSERT INTO live_qa_votes (qa_id, user_id) VALUES
(1, 4),
(2, 3);