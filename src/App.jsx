import { useState } from 'react'

import CustomNavbar from './components/CustomNavbar';
import CustomFooter from './components/CustomFooter';
import { CarritoProvider } from './context/CarritoContext';
import Carrito from './pages/Carrito';

import Home from './pages/Home';
import Visitanos from './pages/Visitanos';
import Exposiciones from './pages/Exposiciones';
import ArteShop from './pages/ArteShop';
import Cursos from './pages/Cursos';
import Artistas from './pages/Artistas';
import Novedades from './pages/Novedades';

function App() {
  const [paginaActual, setPaginaActual] = useState('home');

  const controlarPagina = () => {
    switch (paginaActual) {
      case 'home':
        return <Home />;
      case 'visitanos':
        return <Visitanos />;
      case 'exposiciones':
        return <Exposiciones />;
      case 'arteshop':
        return <ArteShop />;
      case 'cursos':
        return <Cursos />;
      case 'artistas':
        return <Artistas />;
      case 'carrito':
        return <Carrito />;
      case 'novedades':
        return <Novedades />
      default:
        return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column min-v-100 bg-light text-dark">
      {/* HEADER */}
      <CustomNavbar paginaActual={paginaActual} setPaginaActual={setPaginaActual} />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1 container py-4 animate__animated animate__fadeIn">
        {controlarPagina()}
      </main>

      {/* FOOTER */}
      <CustomFooter setPaginaActual={setPaginaActual} />
    </div>
  );

}

export default function AppConCarrito() {
  return (
    <CarritoProvider>
      <App />
    </CarritoProvider>
  );
}
