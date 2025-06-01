-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_sets ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Meals policies
CREATE POLICY "Users can view their own meals"
    ON meals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meals"
    ON meals FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meals"
    ON meals FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meals"
    ON meals FOR DELETE
    USING (auth.uid() = user_id);

-- Exercises policies
CREATE POLICY "Anyone can view exercises"
    ON exercises FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can insert exercises"
    ON exercises FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Workout sessions policies
CREATE POLICY "Users can view their own workout sessions"
    ON workout_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout sessions"
    ON workout_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout sessions"
    ON workout_sessions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout sessions"
    ON workout_sessions FOR DELETE
    USING (auth.uid() = user_id);

-- Session exercises policies
CREATE POLICY "Users can view their own session exercises"
    ON session_exercises FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM workout_sessions
        WHERE workout_sessions.id = session_exercises.session_id
        AND workout_sessions.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert their own session exercises"
    ON session_exercises FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM workout_sessions
        WHERE workout_sessions.id = session_exercises.session_id
        AND workout_sessions.user_id = auth.uid()
    ));

-- Exercise sets policies
CREATE POLICY "Users can view their own exercise sets"
    ON exercise_sets FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM session_exercises
        JOIN workout_sessions ON workout_sessions.id = session_exercises.session_id
        WHERE session_exercises.id = exercise_sets.session_exercise_id
        AND workout_sessions.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert their own exercise sets"
    ON exercise_sets FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM session_exercises
        JOIN workout_sessions ON workout_sessions.id = session_exercises.session_id
        WHERE session_exercises.id = exercise_sets.session_exercise_id
        AND workout_sessions.user_id = auth.uid()
    )); 