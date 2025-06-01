-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    unit_system TEXT NOT NULL DEFAULT 'metric',
    goal_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meals table
CREATE TABLE meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    logged_at TIMESTAMPTZ DEFAULT NOW(),
    image_path TEXT,
    total_kcal INTEGER,
    total_protein NUMERIC(6,1),
    total_carbs NUMERIC(6,1),
    total_fat NUMERIC(6,1)
);

-- Exercises table
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    muscle_group TEXT,
    is_global BOOLEAN DEFAULT TRUE
);

-- Workout sessions table
CREATE TABLE workout_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    total_volume INTEGER,
    notes TEXT
);

-- Session exercises table
CREATE TABLE session_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES workout_sessions(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(id),
    order_idx SMALLINT
);

-- Exercise sets table
CREATE TABLE exercise_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_exercise_id UUID REFERENCES session_exercises(id) ON DELETE CASCADE,
    weight NUMERIC(6,2),
    reps SMALLINT,
    logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_meals_user_id ON meals(user_id);
CREATE INDEX idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX idx_session_exercises_session_id ON session_exercises(session_id);
CREATE INDEX idx_exercise_sets_session_exercise_id ON exercise_sets(session_exercise_id); 