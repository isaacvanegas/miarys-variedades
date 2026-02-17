import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">storefront</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">Miarys Variedades</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Your one-stop shop for everything you need. Quality products, great prices, and direct service via WhatsApp.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-bold text-slate-900 mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-slate-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-bold text-slate-900 mb-4">Stay Updated</h3>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-slate-100 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <button type="button" className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors">
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2024 Miarys Variedades. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
