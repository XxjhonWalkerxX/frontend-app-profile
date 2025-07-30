import React from 'react';
import PropTypes from 'prop-types';
import EMILogo from './assets/EMI_logo.png';
import BannerBackground from './assets/banner_classroom.png';

const Banner = () => {
  return (
    <div className="emi-banner">
      {/* Contenedor del fondo borroso */}
      <div className="emi-banner-background-container">
        <div
          className="emi-banner-background-image"
          style={{ backgroundImage: `url(${BannerBackground})` }}
        />
        <div className="emi-banner-overlay" />
      </div>

      {/* Contenido del banner - Logo EMI a la derecha */}
      <div className="emi-banner-content">
        <div className="emi-banner-logo-container">
          <img
            src={EMILogo}
            alt="Escuela Mexicana de Inglés"
            className="emi-banner-logo"
          />
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {};

export default Banner;
