import React from "react";
import qImg from "../img/q.jpg";
import lImg from "../img/l.jpg";

interface Subasta {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string | null;
  ofertaActual: number;
  duracion: number;
  creadaEn: string;
  creador: string;
}

interface HomeProps {
  user: any;
  onNavigate: (page: string) => void;
  subastas: Subasta[];
}

const Home: React.FC<HomeProps> = ({ user, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8F9F8]">
      <div className="h-[100px]" />
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#003366] mb-4">
            Bienvenido a Qhatu
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Esta es una plataforma de subastas en línea concentrada en la ciudad 
            de La Paz, Bolivia, donde puedes comprar y vender productos de tu interés
            de manera fácil y segura.
          </p>
        </div>

        <div className="w-full h-72 rounded-xl overflow-hidden shadow">
          <img
            src={qImg}
            alt="Imagen de subastas"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="w-full h-72 rounded-xl overflow-hidden shadow">
          <img
            src={lImg}
            alt="Imagen informativa"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#2E594E] mb-4">
            ¿Cómo funcionan?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            En Qhatu, los usuarios pueden crear subastas para vender sus productos.
            Otros usuarios pueden pujar por estos productos, y al finalizar la subasta,
            la persona con la oferta más alta gana el producto.
          </p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-[#003366] mb-6">
          Regístrate ya
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Que estas esperando para unirte a Qhatu y comenzar a explorar las mejores 
          ofertas en productos únicos.
        </p>

        <button
          onClick={() => onNavigate("registro")}
          className="px-10 py-4 bg-[#003366] text-white font-bold rounded-xl text-lg shadow-lg hover:bg-[#1b2e38] transition-all"
        >
          Suscribete ya!
        </button>
      </div>
    </div>
  );
};

export default Home;
