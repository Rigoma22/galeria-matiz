import { useState } from 'react'

import CustomNavbar from './components/CustomNavbar';
import CustomFooter from './components/CustomFooter';

import Home from './pages/Home';
import Visitanos from './pages/Visitanos';
import Exposiciones from './pages/Exposiciones';
import ArteShop from './pages/ArteShop';
import Cursos from './pages/Cursos';

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

export default App
