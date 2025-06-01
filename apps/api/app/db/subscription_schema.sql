-- Añadir columnas de suscripción a la tabla users
ALTER TABLE users
ADD COLUMN subscription_status TEXT NOT NULL DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium')),
ADD COLUMN subscription_type TEXT CHECK (subscription_type IN ('monthly', 'yearly')),
ADD COLUMN subscription_start_date TIMESTAMPTZ,
ADD COLUMN subscription_end_date TIMESTAMPTZ,
ADD COLUMN total_payments DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN last_payment_date TIMESTAMPTZ,
ADD COLUMN last_payment_amount DECIMAL(10,2),
ADD COLUMN payment_history JSONB DEFAULT '[]'::jsonb;

-- Crear índice para búsquedas por estado de suscripción
CREATE INDEX idx_users_subscription_status ON users(subscription_status);

-- Crear índice para búsquedas por fecha de expiración
CREATE INDEX idx_users_subscription_end_date ON users(subscription_end_date);

-- Comentarios de las columnas
COMMENT ON COLUMN users.subscription_status IS 'Estado de la suscripción: free o premium';
COMMENT ON COLUMN users.subscription_type IS 'Tipo de suscripción: monthly o yearly';
COMMENT ON COLUMN users.subscription_start_date IS 'Fecha de inicio de la suscripción actual';
COMMENT ON COLUMN users.subscription_end_date IS 'Fecha de expiración de la suscripción actual';
COMMENT ON COLUMN users.total_payments IS 'Total acumulado de pagos realizados';
COMMENT ON COLUMN users.last_payment_date IS 'Fecha del último pago realizado';
COMMENT ON COLUMN users.last_payment_amount IS 'Monto del último pago realizado';
COMMENT ON COLUMN users.payment_history IS 'Historial de pagos en formato JSON'; 