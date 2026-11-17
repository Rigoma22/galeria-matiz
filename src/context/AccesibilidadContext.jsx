import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const AccesibilidadContext = createContext(null);

export function AccesibilidadProvider({ children }) {

  const [altoContraste, setAltoContraste] = useState(() => {
    return localStorage.getItem('matiz-alto-contraste') === 'true';
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      'alto-contraste',
      altoContraste
    );

    localStorage.setItem(
      'matiz-alto-contraste',
      String(altoContraste)
    );
  }, [altoContraste]);

  const alternarContraste = () => {
    setAltoContraste(actual => !actual);
  };

  return (
    <AccesibilidadContext.Provider
      value={{ altoContraste, alternarContraste }}
    >
      {children}
    </AccesibilidadContext.Provider>
  );
}

export function useAccesibilidad() {
  const contexto = useContext(AccesibilidadContext);

  if (!contexto) {
    throw new Error(
      'useAccesibilidad debe utilizarse dentro de AccesibilidadProvider'
    );
  }

  return contexto;
}