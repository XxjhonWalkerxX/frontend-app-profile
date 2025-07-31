import React from 'react';
import PropTypes from 'prop-types';
import EMILogo from './assets/EMI_logo.png';
import BannerBackground from './assets/banner_classroom.png';

const Banner = ({ username, dateJoined, profileAvatar }) => {
  return (
    <div className="emi-banner">
      {/* Fondo degradado + imagen borrosa + overlay */}
      <div className="emi-banner-background-container">
        <div 
          className="emi-banner-background-image"
          style={{ backgroundImage: `url(${BannerBackground})` }}
        />
        <div className="emi-banner-overlay" />
      </div>

      {/* Contenido del banner - Tres bloques horizontales */}
      <div className="emi-banner-content">
        {/* Bloque 1: Avatar + texto (izquierda) */}
        <div className="emi-banner-section emi-banner-left">
          <div className="emi-banner-avatar-container">
            {profileAvatar}
          </div>
          <div className="emi-banner-user-info">
            <h1 className="emi-banner-username">{username}</h1>
            <p className="emi-banner-member-since">{dateJoined}</p>
          </div>
        </div>

        {/* Bloque 2: Logo EMI (centro) */}
        <div className="emi-banner-section emi-banner-center">
          <div className="emi-banner-logo-container">
            <img
              src={EMILogo}
              alt="Escuela Mexicana de Inglés"
              className="emi-banner-logo"
            />
          </div>
        </div>

        {/* Bloque 3: Espacio para futuras funcionalidades (derecha) */}
        <div className="emi-banner-section emi-banner-right">
          {/* Reservado para futuras funcionalidades */}
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  username: PropTypes.string,
  dateJoined: PropTypes.string,
  profileAvatar: PropTypes.node,
};

Banner.propTypes = {
  username: PropTypes.string,
  dateJoined: PropTypes.string,
  profileAvatar: PropTypes.node,
};

Banner.defaultProps = {
  username: '',
  dateJoined: '',
  profileAvatar: null,
};

export default Banner;
