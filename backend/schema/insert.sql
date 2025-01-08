-- insert users
INSERT INTO users (user_id, name, email, password_hash, phone_number, role) VALUES
    (gen_random_uuid(), 'Alice Organizer', 'alice@example.com', 'hashed_password_1', '1234567890', 'organizer'),
    (gen_random_uuid(), 'Bob Attendee', 'bob@example.com', 'hashed_password_2', '0987654321', 'attendee'),
    (gen_random_uuid(), 'Charlie Organizer', 'charlie@example.com', 'hashed_password_3', '1231231234', 'organizer'),
    (gen_random_uuid(), 'Diana Attendee', 'diana@example.com', 'hashed_password_4', '4321432143', 'attendee');


-- insert events
INSERT INTO events (event_id, organizer_id, name, description, venue, date, time, banner) VALUES
    (gen_random_uuid(), (SELECT user_id FROM users WHERE name = 'Alice Organizer'), 
     'Tech Conference', 'An exciting tech conference.', 'Tech Arena', '2025-01-15', '09:00:00', NULL),
    (gen_random_uuid(), (SELECT user_id FROM users WHERE name = 'Charlie Organizer'), 
     'Music Festival', 'Live music by top artists.', 'Open Air Grounds', '2025-02-20', '17:00:00', NULL);


--Insert Tickets
INSERT INTO tickets (ticket_id, event_id, type, price, quantity_available) VALUES
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Tech Conference'), 'Early Bird', 50.00, 100),
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Tech Conference'), 'VIP', 150.00, 50),
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Music Festival'), 'General', 30.00, 200);


-- Insert ticket purchases
INSERT INTO ticket_purchases (purchase_id, user_id, ticket_id, quantity, total_price, qr_code, payment_status) VALUES
    (gen_random_uuid(), (SELECT user_id FROM users WHERE name = 'Bob Attendee'), 
     (SELECT ticket_id FROM tickets WHERE type = 'Early Bird' AND price = 50.00), 
     2, 100.00, 'sample_qr_code_1', 'Completed'),
    (gen_random_uuid(), (SELECT user_id FROM users WHERE name = 'Diana Attendee'), 
     (SELECT ticket_id FROM tickets WHERE type = 'General' AND price = 30.00), 
     3, 90.00, 'sample_qr_code_2', 'Completed');


-- Insert discount codes
INSERT INTO discount_codes (discount_id, event_id, code, discount_percentage, max_uses, valid_until) VALUES
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Tech Conference'), 
     'TECH10', 10.00, 50, '2025-01-14'),
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Music Festival'), 
     'MUSIC15', 15.00, 100, '2025-02-19');


-- insert feedback
INSERT INTO feedback (feedback_id, user_id, event_id, rating, comments) VALUES
    (gen_random_uuid(), (SELECT user_id FROM users WHERE name = 'Bob Attendee'), 
     (SELECT event_id FROM events WHERE name = 'Tech Conference'), 5, 'Amazing event! Very informative.'),
    (gen_random_uuid(), (SELECT user_id FROM users WHERE name = 'Diana Attendee'), 
     (SELECT event_id FROM events WHERE name = 'Music Festival'), 4, 'Great music but crowded.');


-- insert event attendees
INSERT INTO event_attendees (attendee_id, event_id, user_id, checked_in) VALUES
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Tech Conference'), 
     (SELECT user_id FROM users WHERE name = 'Bob Attendee'), TRUE),
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Music Festival'), 
     (SELECT user_id FROM users WHERE name = 'Diana Attendee'), FALSE);


--insert Live Q&A
INSERT INTO live_qa (qa_id, event_id, user_id, content, is_approved) VALUES
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Tech Conference'), 
     (SELECT user_id FROM users WHERE name = 'Bob Attendee'), 
     'What are the key takeaways for beginners?', TRUE);


--insert Live Polls
INSERT INTO live_polls (poll_id, event_id, question) VALUES
    (gen_random_uuid(), (SELECT event_id FROM events WHERE name = 'Tech Conference'), 
     'Which session did you find most useful?');


--insert live poll options
INSERT INTO live_poll_options (option_id, poll_id, option_text) VALUES
    (gen_random_uuid(), (SELECT poll_id FROM live_polls WHERE question = 'Which session did you find most useful?'), 
     'Session A: AI Basics'),
    (gen_random_uuid(), (SELECT poll_id FROM live_polls WHERE question = 'Which session did you find most useful?'), 
     'Session B: Advanced Cloud Computing');



