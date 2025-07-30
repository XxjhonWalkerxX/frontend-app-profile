import React, { useEffect } from 'react';

const GobMxFooter = () => {
  useEffect(() => {
    // Cargar el CSS del framework del gobierno mexicano de manera asíncrona
    const loadGobMxStyles = () => {
      const link = document.createElement('link');
      link.href = 'https://framework-gb.cdn.gob.mx/assets/styles/main.css';
      link.rel = 'stylesheet';
      link.id = 'gobmx-styles';
      document.head.appendChild(link);
    };

    // Cargar el JavaScript del framework del gobierno mexicano
    const loadGobMxScript = () => {
      const script = document.createElement('script');
      script.src = 'https://framework-gb.cdn.gob.mx/gobmx.js';
      script.async = true;
      script.id = 'gobmx-script';
      document.body.appendChild(script);
    };

    // Cargar solo si no están ya cargados
    if (!document.getElementById('gobmx-styles')) {
      loadGobMxStyles();
    }
    if (!document.getElementById('gobmx-script')) {
      loadGobMxScript();
    }

    // Cleanup al desmontar el componente
    return () => {
      const styles = document.getElementById('gobmx-styles');
      const script = document.getElementById('gobmx-script');
      if (styles) styles.remove();
      if (script) script.remove();
    };
  }, []);

  return (
    <div className="gobmx-footer-container">
      {/* El contenido del footer del gobierno mexicano se generará aquí por el script */}
      <div id="gobmx-footer"></div>
    </div>
  );
};

export default GobMxFooter;
