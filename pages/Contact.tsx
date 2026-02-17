import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar onSearch={() => {}} cartCount={0} />
      
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Contact Info Side */}
            <div className="bg-primary p-8 md:p-12 text-white md:w-5/12">
                <h1 className="text-3xl font-black mb-4">Contáctanos</h1>
                <p className="mb-8 text-blue-100">
                    Estamos aquí para ayudarte. Escríbenos o llámanos para cualquier duda sobre tus pedidos o productos.
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                            <span className="material-symbols-outlined">call</span>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Teléfono / WhatsApp</p>
                            <p className="font-medium">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                            <span className="material-symbols-outlined">mail</span>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Email</p>
                            <p className="font-medium">hola@miarysvariedades.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                            <span className="material-symbols-outlined">pin_drop</span>
                        </div>
                        <div>
                            <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Ubicación</p>
                            <p className="font-medium">Tienda Online - Envíos a todo el país</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-4">Síguenos</p>
                    <div className="flex gap-4">
                         {/* Social Placeholders */}
                         <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-colors cursor-pointer">
                             <span className="font-bold">IG</span>
                         </div>
                         <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-colors cursor-pointer">
                             <span className="font-bold">FB</span>
                         </div>
                         <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-colors cursor-pointer">
                             <span className="font-bold">TK</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="p-8 md:p-12 md:w-7/12">
                 <h2 className="text-2xl font-bold text-slate-800 mb-6">Envíanos un mensaje</h2>
                 <form className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <label className="block text-sm font-medium text-slate-600 mb-1">Nombre</label>
                             <input type="text" className="w-full bg-slate-50 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary" />
                         </div>
                         <div>
                             <label className="block text-sm font-medium text-slate-600 mb-1">Apellido</label>
                             <input type="text" className="w-full bg-slate-50 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary" />
                         </div>
                     </div>
                     <div>
                         <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                         <input type="email" className="w-full bg-slate-50 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary" />
                     </div>
                     <div>
                         <label className="block text-sm font-medium text-slate-600 mb-1">Mensaje</label>
                         <textarea rows={4} className="w-full bg-slate-50 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary"></textarea>
                     </div>
                     <button type="button" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition-colors">
                         Enviar Mensaje
                     </button>
                 </form>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
