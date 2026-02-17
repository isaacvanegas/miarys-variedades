import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Footer from '../components/Footer';
import { getActiveProducts, searchProducts, getCategories } from '../services/productService';
import { Product, Category } from '../types';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Filtering State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [prodData, catData] = await Promise.all([
        getActiveProducts(),
        getCategories()
      ]);
      setProducts(prodData);
      setFilteredProducts(prodData);
      setCategories(catData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Combined Filter Logic
  useEffect(() => {
    let result = searchProducts(products, searchQuery);
    
    if (selectedCategory !== 'All') {
        result = result.filter(p => p.categorias.includes(selectedCategory));
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [searchQuery, selectedCategory, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar onSearch={handleSearch} cartCount={0} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Stories / Categories Section */}
        <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
            <div className="flex gap-4 sm:gap-6 min-w-max px-2">
                {/* All Button as a Story */}
                <button 
                    onClick={() => handleCategoryClick('All')}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                    <div className={`p-[3px] rounded-full ${selectedCategory === 'All' ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'bg-slate-200'}`}>
                        <div className="size-16 sm:size-20 rounded-full bg-white border-2 border-white overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                             <span className="material-symbols-outlined text-3xl text-slate-700">grid_view</span>
                        </div>
                    </div>
                    <span className={`text-xs font-medium ${selectedCategory === 'All' ? 'text-slate-900' : 'text-slate-500'}`}>Todo</span>
                </button>

                {categories.map((cat) => (
                    <button 
                        key={cat.id} 
                        onClick={() => handleCategoryClick(cat.nombre)}
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                        <div className={`p-[3px] rounded-full ${selectedCategory === cat.nombre ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'bg-transparent'}`}>
                            <div className="size-16 sm:size-20 rounded-full bg-white border-2 border-white overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                                <img src={cat.imagen} alt={cat.nombre} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className={`text-xs font-medium ${selectedCategory === cat.nombre ? 'text-slate-900' : 'text-slate-500'}`}>{cat.nombre}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Products Masonry Grid */}
        <div className="mb-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    {selectedCategory === 'All' ? 'Descubre' : selectedCategory}
                    <span className="text-sm font-normal text-slate-400 ml-2">({filteredProducts.length} items)</span>
                </h2>
                
                {/* Items Per Page Select */}
                <select 
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="bg-white border border-slate-200 rounded-lg text-sm px-2 py-1 focus:ring-primary focus:border-primary"
                >
                    <option value={10}>10 por pág</option>
                    <option value={20}>20 por pág</option>
                    <option value={50}>50 por pág</option>
                </select>
            </div>

            {loading ? (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                   {[1,2,3,4,5,6].map(i => (
                       <div key={i} className="break-inside-avoid bg-white rounded-3xl h-64 animate-pulse"></div>
                   ))}
                </div>
            ) : (
                <>
                    {filteredProducts.length === 0 ? (
                         <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                             <span className="material-symbols-outlined text-6xl mb-4">checkroom</span>
                             <p>No hay productos en esta categoría aún.</p>
                         </div>
                    ) : (
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 pb-12">
                            {currentItems.map(product => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onClick={setSelectedProduct} 
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 pb-12 mt-8">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-colors"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                        currentPage === page 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-colors"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${15551234567}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center size-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 animate-bounce-subtle"
      >
        <span className="material-symbols-outlined text-[32px]">chat</span>
      </a>

      <Footer />
    </div>
  );
};

export default Home;
