import React, { useState } from 'react';

interface LoginProps {
  onLogin: (user: any) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: email,
      email,
      firstName: email.split('@')[0],
      lastName: ''
    };
    onLogin(user);
  };

  return (
    <div className="font-display bg-[#101c22] text-slate-200 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <img
        src="https://plus.unsplash.com/premium_photo-1681487977919-306ef7194d98?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN1YmFzdGFzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500?auto=format&fit=crop&w=1600&q=60"
        alt="Fondo Qhatu"
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />

      <div className="absolute inset-0 bg-[#60A5FA]/30"></div>
      <div className="relative z-10 text-center max-w-lg p-8">
        <h1 className="text-5xl font-black text-white mb-4">Únete a Qhatu</h1>
        <p className="text-lg text-slate-200 mb-10">
          Descubre las mejores subastas.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-[#ffffff10] backdrop-blur-md p-6 rounded-xl shadow-lg max-w-md mx-auto"
        >
          <label className="flex flex-col text-left">
            <span className="text-sm font-medium text-white mb-1">Correo electrónico</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#EFD780]"
              required
            />
          </label>

          <label className="flex flex-col text-left">
            <span className="text-sm font-medium text-white mb-1">Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#EFD780]"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-[#EFD780] text-[#2E594E] font-bold py-3 rounded-lg hover:bg-[#f5e197] transition-colors"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-8">
          <button
            onClick={() => onNavigate('registro')}
            className="bg-[#3B82F6] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#BFDBFE] transition-colors"
          >
            Crear cuenta nueva
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
