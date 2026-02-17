import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProductsAdmin, createProduct, updateProduct, deleteProduct, getCategories, createCategory, updateCategory, deleteCategory } from '../services/productService';
import { Product, Category } from '../types';

type Tab = 'products' | 'categories';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  // Edit Tracking
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form States (Product)
  const [prodForm, setProdForm] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    mostrar_precio: true,
    categorias: '', // Comma separated for UI
    fotos: '', // Comma separated for UI
    link_video: '',
    estado: 'disponible' as const
  });

  // Form State (Category)
  const [catForm, setCatForm] = useState({ nombre: '', imagen: '' });

  useEffect(() => {
    // Basic Auth Check
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
        navigate('/login');
        return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([getAllProductsAdmin(), getCategories()]);
    setProducts(p);
    setCategories(c);
    setLoading(false);
  };

  // --- HANDLERS PRODUCT ---

  const handleOpenProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProdForm({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        mostrar_precio: product.mostrar_precio,
        categorias: product.categorias.join(', '),
        fotos: product.fotos.join(', '),
        link_video: product.link_video || '',
        estado: product.estado
      });
    } else {
      setEditingProduct(null);
      setProdForm({
        nombre: '',
        descripcion: '',
        precio: 0,
        mostrar_precio: true,
        categorias: '',
        fotos: '',
        link_video: '',
        estado: 'disponible'
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
        ...prodForm,
        categorias: prodForm.categorias.split(',').map(s => s.trim()).filter(Boolean),
        fotos: prodForm.fotos.split(',').map(s => s.trim()).filter(Boolean),
        etiquetas: {}
    };

    try {
        if (editingProduct) {
            await updateProduct({ ...editingProduct, ...formattedData });
        } else {
            await createProduct(formattedData);
        }
        await loadData();
        setIsProductModalOpen(false);
    } catch (err) {
        alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
        await deleteProduct(id);
        await loadData();
    }
  };

  // --- HANDLERS CATEGORY ---

  const handleOpenCategoryModal = (category?: Category) => {
      if (category) {
          setEditingCategory(category);
          setCatForm({ nombre: category.nombre, imagen: category.imagen });
      } else {
          setEditingCategory(null);
          setCatForm({ nombre: '', imagen: '' });
      }
      setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.nombre || !catForm.imagen) return;
    try {
        if (editingCategory) {
            await updateCategory({ ...editingCategory, ...catForm });
        } else {
            await createCategory(catForm.nombre, catForm.imagen);
        }
        await loadData();
        setIsCategoryModalOpen(false);
    } catch(err) {
        alert('Error saving category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('¿Eliminar categoría?')) {
        await deleteCategory(id);
        await loadData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-100">
           <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
               <span className="material-symbols-outlined">storefront</span>
           </div>
           <span className="ml-3 font-bold text-slate-800 hidden lg:block">Admin Panel</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-medium hidden lg:block">Productos</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === 'categories' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined">category</span>
            <span className="font-medium hidden lg:block">Categorías</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
             <span className="material-symbols-outlined">logout</span>
             <span className="font-medium hidden lg:block">Cerrar Sesión</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
           <div>
               <h1 className="text-2xl font-black text-slate-900 capitalize">{activeTab}</h1>
               <p className="text-slate-500 text-sm">Gestiona tu inventario y contenido</p>
           </div>
           
           <div className="flex gap-3">
               <Link to="/" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                   Ver Tienda
               </Link>
               <button 
                onClick={() => activeTab === 'products' ? handleOpenProductModal() : handleOpenCategoryModal()}
                className="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg"
               >
                 <span className="material-symbols-outlined text-[18px]">add</span>
                 Agregar Nuevo
               </button>
           </div>
        </header>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             
             {/* PRODUCTS TABLE */}
             {activeTab === 'products' && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                        <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Producto</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Categoría</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Precio</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? <tr><td colSpan={5} className="p-8 text-center">Cargando...</td></tr> : products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="size-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                                  {p.fotos[0] ? (
                                    <img src={p.fotos[0]} alt="" className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-slate-200">
                                        <span className="material-symbols-outlined text-slate-400">videocam</span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                <div className="text-sm font-bold text-slate-900">{p.nombre}</div>
                                <div className="text-xs text-slate-500 truncate max-w-[150px]">{p.descripcion}</div>
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {p.categorias.map(c => (
                                    <span key={c} className="inline-block bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full mr-1">{c}</span>
                                ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            ${p.precio.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-md text-xs font-bold capitalize ${
                                p.estado === 'disponible' ? 'bg-green-100 text-green-700' : 
                                p.estado === 'agotado' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {p.estado}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOpenProductModal(p)} className="text-slate-400 hover:text-primary p-1">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button onClick={() => handleDeleteProduct(p.id)} className="text-slate-400 hover:text-red-600 p-1">
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
             )}

             {/* CATEGORIES GRID */}
             {activeTab === 'categories' && (
                 <div className="p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {categories.map(cat => (
                        <div key={cat.id} className="relative group bg-slate-50 rounded-2xl p-4 flex flex-col items-center border border-slate-100 hover:border-primary/50 transition-colors">
                             <div className="size-20 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden mb-3">
                                <img src={cat.imagen} alt={cat.nombre} className="w-full h-full object-cover" />
                             </div>
                             <h3 className="font-bold text-slate-800">{cat.nombre}</h3>
                             
                             {/* Action Buttons */}
                             <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                 <button 
                                    onClick={() => handleOpenCategoryModal(cat)}
                                    className="p-1 bg-white rounded-full shadow-sm text-primary hover:bg-primary hover:text-white transition-colors"
                                 >
                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                 </button>
                                 <button 
                                    onClick={() => handleDeleteCategory(cat.id)}
                                    className="p-1 bg-white rounded-full shadow-sm text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                 >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                 </button>
                             </div>
                        </div>
                    ))}
                    
                    {/* Add Card */}
                    <button onClick={() => handleOpenCategoryModal()} className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all text-slate-400 hover:text-primary">
                        <span className="material-symbols-outlined text-3xl mb-2">add_circle</span>
                        <span className="text-sm font-medium">Nueva</span>
                    </button>
                 </div>
             )}
        </div>
      </main>

      {/* MODAL: ADD/EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
                    <h2 className="text-xl font-bold text-slate-800">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    <button onClick={() => setIsProductModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-full"><span className="material-symbols-outlined">close</span></button>
                </header>
                <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre</label>
                            <input type="text" required value={prodForm.nombre} onChange={e => setProdForm({...prodForm, nombre: e.target.value})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary" placeholder="Ej. Zapatos Nike" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción</label>
                            <textarea rows={3} value={prodForm.descripcion} onChange={e => setProdForm({...prodForm, descripcion: e.target.value})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary" placeholder="Detalles del producto..."></textarea>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Precio</label>
                            <input type="number" step="0.01" required value={prodForm.precio} onChange={e => setProdForm({...prodForm, precio: parseFloat(e.target.value)})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estado</label>
                            <select value={prodForm.estado} onChange={e => setProdForm({...prodForm, estado: e.target.value as any})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary">
                                <option value="disponible">Disponible</option>
                                <option value="agotado">Agotado</option>
                                <option value="eliminado">Archivado</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Categorías (Separadas por coma)</label>
                             <input type="text" value={prodForm.categorias} onChange={e => setProdForm({...prodForm, categorias: e.target.value})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary" placeholder="Ropa, Verano, Oferta" />
                        </div>
                        <div className="col-span-2">
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fotos URLs (Separadas por coma)</label>
                             <input type="text" value={prodForm.fotos} onChange={e => setProdForm({...prodForm, fotos: e.target.value})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary" placeholder="https://..., https://..." />
                        </div>
                        <div className="col-span-2">
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Video Link (YouTube/Vimeo)</label>
                             <input type="text" value={prodForm.link_video} onChange={e => setProdForm({...prodForm, link_video: e.target.value})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary" placeholder="Opcional" />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                             <input type="checkbox" id="showPrice" checked={prodForm.mostrar_precio} onChange={e => setProdForm({...prodForm, mostrar_precio: e.target.checked})} className="rounded text-primary focus:ring-primary" />
                             <label htmlFor="showPrice" className="text-sm font-medium text-slate-700">Mostrar precio públicamente</label>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Cancelar</button>
                        <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/30 hover:bg-primary-dark">Guardar Producto</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* MODAL: ADD/EDIT CATEGORY */}
      {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                <form onSubmit={handleSaveCategory} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre</label>
                        <input type="text" required value={catForm.nombre} onChange={e => setCatForm({...catForm, nombre: e.target.value})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Imagen URL (Historia)</label>
                        <input type="text" required value={catForm.imagen} onChange={e => setCatForm({...catForm, imagen: e.target.value})} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                        <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg">Guardar</button>
                    </div>
                </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;
