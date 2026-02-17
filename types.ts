export interface Product {
  id: string; // UUID
  nombre: string;
  descripcion: string;
  precio: number;
  mostrar_precio: boolean;
  categorias: string[]; // Array of strings references
  fotos: string[]; // Array of URLs
  link_video?: string;
  etiquetas: Record<string, any>; // JSONB
  estado: 'disponible' | 'agotado' | 'eliminado';
  likes: number;
  fecha_desactivacion?: string | null;
  fecha_creacion: string;
}

export interface Category {
  id: string;
  nombre: string;
  imagen: string; // URL for the "Story" bubble
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface CartItem extends Product {
  quantity: number;
}
