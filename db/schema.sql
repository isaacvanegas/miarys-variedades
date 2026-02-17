-- Eschema de Base de Datos para Miarys Variedades
-- Compatible con PostgreSQL / Supabase

-- 1. Habilitar extensión para UUIDs si es necesario
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabla de Productos
CREATE TABLE productos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    mostrar_precio BOOLEAN DEFAULT TRUE,
    categorias TEXT[], -- Array de strings para categorías
    fotos TEXT[], -- Array de strings para URLs de imágenes
    link_video VARCHAR(255),
    etiquetas JSONB DEFAULT '{}'::jsonb,
    estado VARCHAR(20) CHECK (estado IN ('disponible', 'agotado', 'eliminado')) DEFAULT 'disponible',
    likes INTEGER DEFAULT 0,
    fecha_desactivacion TIMESTAMP WITH TIME ZONE,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Índices para búsqueda rápida (Case Insensitive)
-- Crear un índice GIN para buscar dentro del JSONB de etiquetas si fuera necesario
CREATE INDEX idx_productos_etiquetas ON productos USING GIN (etiquetas);

-- Crear índice para búsquedas por nombre insensible a mayúsculas/minúsculas
CREATE INDEX idx_productos_nombre_lower ON productos (LOWER(nombre));

-- 4. Políticas de Seguridad (RLS - Row Level Security) para Supabase
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede ver productos activos
CREATE POLICY "Productos visibles para todos" ON productos
FOR SELECT
USING (
    estado != 'eliminado' 
    AND (fecha_desactivacion IS NULL OR fecha_desactivacion > NOW())
);

-- Política: Solo administradores pueden insertar/actualizar/borrar
-- (Asumiendo que existe una tabla 'profiles' o gestión de roles en auth.users)
CREATE POLICY "Solo admins modifican" ON productos
FOR ALL
USING (
    auth.role() = 'authenticated' -- Simplificado para el ejemplo
    -- En producción: AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
