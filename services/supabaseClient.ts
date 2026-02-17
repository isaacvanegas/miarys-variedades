import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../constants';

/**
 * Ejemplo de Integración con Supabase
 * 
 * En una aplicación real, esto exportaría el cliente configurado.
 * Para esta demo, exportamos el cliente pero usamos datos mock
 * en los servicios para asegurar que la UI funcione sin backend real.
 */

// Initialize the client
export const supabase = createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);

// Example function to fetch products using Supabase
export const fetchProductsFromSupabase = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .neq('estado', 'eliminado')
    .or(`fecha_desactivacion.is.null,fecha_desactivacion.gt.${new Date().toISOString()}`);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
};
