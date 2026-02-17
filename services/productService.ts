import { Product, Category } from '../types';
import { SHOP_CONFIG } from '../constants';

// --- INITIAL DATA (Seeds) ---
const SEED_CATEGORIES: Category[] = [
  { id: 'cat1', nombre: 'Ropa', imagen: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop' },
  { id: 'cat2', nombre: 'Zapatos', imagen: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
  { id: 'cat3', nombre: 'Hogar', imagen: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop' },
  { id: 'cat4', nombre: 'Tech', imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
  { id: 'cat5', nombre: 'Belleza', imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=400&h=400&fit=crop' },
  { id: 'cat6', nombre: 'Juguetes', imagen: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop' },
];

// Helper to generate mock products
const generateMockProducts = (): Product[] => {
  const baseProducts = [
    {
      id: '1',
      nombre: 'Auriculares Retro Vibe',
      descripcion: 'Sumérgete en el sonido puro. Diseño vintage con cancelación de ruido moderna.',
      precio: 129.99,
      mostrar_precio: true,
      categorias: ['Tech'],
      fotos: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800'],
      estado: 'disponible',
      likes: 128,
      etiquetas: { color: 'Beige' }
    },
    {
      id: '2',
      nombre: 'Vestido Floral Summer',
      descripcion: 'Perfecto para días soleados. Tela ligera y transpirable.',
      precio: 45.00,
      mostrar_precio: true,
      categorias: ['Ropa'],
      fotos: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'],
      estado: 'disponible',
      likes: 245,
      etiquetas: { talla: 'M' }
    },
    {
      id: '3',
      nombre: 'Sneakers Urban Flow',
      descripcion: 'Comodidad todo el día con estilo urbano.',
      precio: 89.99,
      mostrar_precio: true,
      categorias: ['Zapatos'],
      fotos: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800'],
      estado: 'agotado',
      likes: 56,
      etiquetas: { talla: '42' }
    },
    {
      id: '4',
      nombre: 'Lámpara Minimalista',
      descripcion: 'Iluminación cálida para tu espacio de lectura.',
      precio: 35.00,
      mostrar_precio: true,
      categorias: ['Hogar'],
      fotos: ['https://images.unsplash.com/photo-1507473888900-52e1ad14592d?w=800'],
      estado: 'disponible',
      likes: 89,
      etiquetas: {}
    },
    {
      id: '5',
      nombre: 'Kit Maquillaje Glow',
      descripcion: 'Todo lo que necesitas para brillar.',
      precio: 55.00,
      mostrar_precio: false,
      categorias: ['Belleza'],
      fotos: ['https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800'],
      estado: 'disponible',
      likes: 312,
      etiquetas: {}
    }
  ];

  const generated: Product[] = [...(baseProducts as any)];
  
  // Generate 25 more items for pagination testing
  for (let i = 6; i <= 30; i++) {
    const category = SEED_CATEGORIES[i % SEED_CATEGORIES.length].nombre;
    generated.push({
      id: i.toString(),
      nombre: `Producto Muestra ${i} - ${category}`,
      descripcion: `Esta es una descripción generada automáticamente para probar la paginación del producto número ${i}. Gran calidad garantizada.`,
      precio: Math.floor(Math.random() * 100) + 10,
      mostrar_precio: Math.random() > 0.3,
      categorias: [category],
      fotos: [`https://picsum.photos/seed/${i}/600/600`], // Random images
      link_video: Math.random() > 0.8 ? 'https://youtube.com' : undefined,
      etiquetas: { generado: 'auto' },
      estado: 'disponible',
      likes: Math.floor(Math.random() * 500),
      fecha_creacion: new Date().toISOString()
    });
  }

  return generated;
};

const SEED_PRODUCTS = generateMockProducts();

// --- LOCAL STORAGE HELPERS ---
const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem('miarys_products');
  if (!stored) {
    localStorage.setItem('miarys_products', JSON.stringify(SEED_PRODUCTS));
    return SEED_PRODUCTS;
  }
  return JSON.parse(stored);
};

const saveStoredProducts = (products: Product[]) => {
  localStorage.setItem('miarys_products', JSON.stringify(products));
};

const getStoredCategories = (): Category[] => {
  const stored = localStorage.getItem('miarys_categories');
  if (!stored) {
    localStorage.setItem('miarys_categories', JSON.stringify(SEED_CATEGORIES));
    return SEED_CATEGORIES;
  }
  return JSON.parse(stored);
};

const saveStoredCategories = (categories: Category[]) => {
  localStorage.setItem('miarys_categories', JSON.stringify(categories));
};

// --- API SIMULATION ---

export const getActiveProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const products = getStoredProducts();
  return products.filter(p => p.estado !== 'eliminado');
};

export const getAllProductsAdmin = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getStoredProducts().filter(p => p.estado !== 'eliminado');
};

export const getCategories = async (): Promise<Category[]> => {
  return getStoredCategories();
};

export const createProduct = async (product: Omit<Product, 'id' | 'fecha_creacion' | 'likes'>): Promise<Product> => {
  const newProduct: Product = {
    ...product,
    id: crypto.randomUUID(),
    fecha_creacion: new Date().toISOString(),
    likes: 0
  };
  const products = getStoredProducts();
  products.unshift(newProduct);
  saveStoredProducts(products);
  return newProduct;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index !== -1) {
    products[index] = product;
    saveStoredProducts(products);
    return product;
  }
  throw new Error("Product not found");
};

export const deleteProduct = async (id: string): Promise<void> => {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index].estado = 'eliminado';
    saveStoredProducts(products);
  }
};

export const toggleProductLike = async (id: string): Promise<number> => {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    // Increment for demo (in real app, check user id)
    products[index].likes += 1; 
    saveStoredProducts(products);
    return products[index].likes;
  }
  return 0;
};

export const createCategory = async (nombre: string, imagen: string): Promise<Category> => {
  const newCat = { id: crypto.randomUUID(), nombre, imagen };
  const cats = getStoredCategories();
  cats.push(newCat);
  saveStoredCategories(cats);
  return newCat;
};

export const updateCategory = async (category: Category): Promise<Category> => {
  const cats = getStoredCategories();
  const index = cats.findIndex(c => c.id === category.id);
  if (index !== -1) {
    cats[index] = category;
    saveStoredCategories(cats);
    return category;
  }
  throw new Error("Category not found");
};

export const deleteCategory = async (id: string): Promise<void> => {
  let cats = getStoredCategories();
  cats = cats.filter(c => c.id !== id);
  saveStoredCategories(cats);
};

export const searchProducts = (products: Product[], query: string): Product[] => {
  if (!query) return products;
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.nombre.toLowerCase().includes(lowerQuery) || 
    p.descripcion.toLowerCase().includes(lowerQuery) ||
    p.categorias.some(c => c.toLowerCase().includes(lowerQuery))
  );
};

export const generateWhatsAppLink = (product: Product): string => {
  const baseUrl = "https://wa.me/";
  const phone = SHOP_CONFIG.WHATSAPP_NUMBER;
  const greeting = "Hola 👋, vi esto en Miarys Variedades:";
  const text = `${greeting} *${product.nombre}*. ${product.mostrar_precio ? 'Quiero comprarlo.' : '¿Me das el precio, por favor?'}`;
  return `${baseUrl}${phone}?text=${encodeURIComponent(text)}`;
};

export const getOptimizedImageUrl = (url: string | undefined): string => {
  if (!url || url.trim() === '') {
     // Placeholder for missing images or video-only items
     return 'https://placehold.co/600x600/101622/FFF?text=Video+Disponible';
  }
  return url;
};
