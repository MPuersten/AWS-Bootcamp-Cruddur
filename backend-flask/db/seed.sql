-- this file was manually created
INSERT INTO public.users (display_name, email, handle, cognito_user_id)
VALUES
  -- ('Andrew Brown', 'andrew@exampro.co', 'andrewbrown', 'MOCK'),
  ('Andrew Bayko', 'bayko@exampro.co', 'bayko', 'MOCK'),
  ('William Puersten', 'fake-second@gamil.com', 'WillB', 'MOCK'),
  ('Mitchell Puersten', 'fake-original@gmail.com', 'MitchP', 'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'MitchP' LIMIT 1),
    'This was imported as seed data!',
    current_timestamp + interval '10 day'
  ),
  (
    (SELECT uuid from public.users WHERE users.handle = 'WillB' LIMIT 1),
    'Other crud!',
    current_timestamp + interval '10 day'
  )