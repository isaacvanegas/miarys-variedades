import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock validation for demo purposes
    if (email === 'admin@miarys.com' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      alert('Credenciales incorrectas (Usa: admin@miarys.com / admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 md:p-12">
        <div className="text-center mb-10">
           <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
           </div>
           <h1 className="text-2xl font-black text-slate-900">Admin Acceso</h1>
           <p className="text-slate-500">Miarys Variedades</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@miarys.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]"
          >
            Ingresar
          </button>
        </form>
        
        <div className="mt-8 text-center">
            <a href="/" className="text-sm text-slate-400 hover:text-primary transition-colors">Volver a la tienda</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
