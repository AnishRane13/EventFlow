-- Insert Users
INSERT INTO users (name, email, password_hash, phone_number, role) VALUES
('John Doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyBAQ/fzL.St.q', '+1234567890', 'organizer'),
('Jane Smith', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyBAQ/fzL.St.q', '+1234567891', 'attendee'),
('Mike Johnson', 'mike@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyBAQ/fzL.St.q', '+1234567892', 'attendee');

DO $$ 
DECLARE
    v_organizer_id UUID;
    v_attendee1_id UUID;
    v_attendee2_id UUID;
    v_event1_id UUID;
    v_event2_id UUID;
    v_ticket1_id UUID;
    v_ticket2_id UUID;
    v_question_id UUID;
    v_poll_id UUID;
    v_option1_id UUID;
    v_option2_id UUID;
BEGIN
    -- Get inserted user IDs
    SELECT user_id INTO v_organizer_id FROM users WHERE email = 'john@example.com';
    SELECT user_id INTO v_attendee1_id FROM users WHERE email = 'jane@example.com';
    SELECT user_id INTO v_attendee2_id FROM users WHERE email = 'mike@example.com';

    -- Insert Events
    INSERT INTO events (organizer_id, name, description, venue, date, time) VALUES
    (v_organizer_id, 'Tech Conference 2025', 'Annual Technology Conference', 'Convention Center', '2025-03-15', '09:00:00')
    RETURNING event_id INTO v_event1_id;
    
    INSERT INTO events (organizer_id, name, description, venue, date, time) VALUES
    (v_organizer_id, 'Digital Summit', 'Digital Marketing Summit', 'Hotel Grand', '2025-04-20', '10:00:00')
    RETURNING event_id INTO v_event2_id;

    -- Insert Tickets
    INSERT INTO tickets (event_id, type, price, quantity_available) VALUES
    (v_event1_id, 'Early Bird', 99.99, 100)
    RETURNING ticket_id INTO v_ticket1_id;
    
    INSERT INTO tickets (event_id, type, price, quantity_available) VALUES
    (v_event1_id, 'VIP', 199.99, 50)
    RETURNING ticket_id INTO v_ticket2_id;

    -- Insert Ticket Purchases
    INSERT INTO ticket_purchases (user_id, ticket_id, quantity, total_price, qr_code, payment_status) VALUES
    (v_attendee1_id, v_ticket1_id, 2, 199.98, 'QR_CODE_1', 'Completed'),
    (v_attendee2_id, v_ticket2_id, 1, 199.99, 'QR_CODE_2', 'Pending');

    -- Insert Discount Codes
    INSERT INTO discount_codes (event_id, code, discount_percentage, max_uses, uses, valid_until) VALUES
    (v_event1_id, 'EARLY25', 25.00, 100, 0, '2025-03-01'),
    (v_event2_id, 'VIP50', 50.00, 50, 0, '2025-04-01');

    -- Insert Feedback
    INSERT INTO feedback (user_id, event_id, rating, comments) VALUES
    (v_attendee1_id, v_event1_id, 5, 'Excellent event!'),
    (v_attendee2_id, v_event1_id, 4, 'Great speakers and content');

    -- Insert Event Attendees
    INSERT INTO event_attendees (event_id, user_id, checked_in) VALUES
    (v_event1_id, v_attendee1_id, true),
    (v_event1_id, v_attendee2_id, false);

    -- Insert Live Q&A
    INSERT INTO live_qa (event_id, user_id, content, is_approved) VALUES
    (v_event1_id, v_attendee1_id, 'What are your thoughts on AI?', true)
    RETURNING qa_id INTO v_question_id;

    -- Insert Live Q&A Answers
    INSERT INTO live_qa_answers (qa_id, user_id, content) VALUES
    (v_question_id, v_organizer_id, 'AI is transforming every industry.');

    -- Insert Live Q&A Votes
    INSERT INTO live_qa_votes (qa_id, user_id) VALUES
    (v_question_id, v_attendee2_id);

    -- Insert Live Polls
    INSERT INTO live_polls (event_id, question) VALUES
    (v_event1_id, 'Which topic interests you the most?')
    RETURNING poll_id INTO v_poll_id;

    -- Insert Live Poll Options
    INSERT INTO live_poll_options (poll_id, option_text) VALUES
    (v_poll_id, 'Artificial Intelligence')
    RETURNING option_id INTO v_option1_id;

    INSERT INTO live_poll_options (poll_id, option_text) VALUES
    (v_poll_id, 'Blockchain Technology')
    RETURNING option_id INTO v_option2_id;

    -- Insert Live Poll Votes
    INSERT INTO live_poll_votes (poll_id, option_id, user_id) VALUES
    (v_poll_id, v_option1_id, v_attendee1_id),
    (v_poll_id, v_option2_id, v_attendee2_id);

END $$;