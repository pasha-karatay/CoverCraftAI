/*
# Create cover letters history table

1. Plain-English summary
   This adds storage for the CoverCraft AI app so every generated cover
   letter is saved and shown in the "History" list, surviving page reloads.
   The app has no sign-in screen, so history is shared/public by design
   (there is no concept of separate user accounts to scope it to).

2. New table: cover_letters
   - `id` (uuid, primary key) - unique identifier for the entry.
   - `company_name` (text, required) - company the letter targets.
   - `job_title` (text, required) - position the letter targets.
   - `experience` (text, required) - experience/skills text supplied by the user.
   - `tone` (text, required) - selected tone (e.g. professional, friendly).
   - `letter` (text, required) - the generated (and possibly edited) letter.
   - `created_at` (timestamptz, default now()) - when it was generated.

3. Indexes
   - Index on `created_at` (descending) to speed up the "recent history" query.

4. Security
   - Row Level Security is enabled on `cover_letters`.
   - Since this app has no authentication, policies grant `anon` and
     `authenticated` roles full CRUD (select/insert/update/delete) so the
     browser (using the public anon key) can read and write history.
     This is intentional: there is no private data boundary in this app.
*/

CREATE TABLE IF NOT EXISTS cover_letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  job_title text NOT NULL,
  experience text NOT NULL,
  tone text NOT NULL,
  letter text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cover_letters_created_at_idx
  ON cover_letters (created_at DESC);

ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_cover_letters" ON cover_letters;
CREATE POLICY "anon_select_cover_letters" ON cover_letters FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_cover_letters" ON cover_letters;
CREATE POLICY "anon_insert_cover_letters" ON cover_letters FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_cover_letters" ON cover_letters;
CREATE POLICY "anon_update_cover_letters" ON cover_letters FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_cover_letters" ON cover_letters;
CREATE POLICY "anon_delete_cover_letters" ON cover_letters FOR DELETE
  TO anon, authenticated USING (true);
