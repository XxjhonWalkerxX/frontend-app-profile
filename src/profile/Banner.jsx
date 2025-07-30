import React from 'react';
import PropTypes from 'prop-types';
import EMILogo from './assets/EMI_logo.png';
import BannerBackground from './assets/banner_classroom.png';

const Banner = ({
  userAvatar = null,
  username,
  userHandle,
  userLevel,
}) => {
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

      {/* Contenido del banner */}
      <div className="emi-banner-content">
        {/* Bloque izquierdo: Avatar y datos del usuario */}
        <div className="emi-banner-left-block">
          <div className="emi-banner-avatar">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={`${username} avatar`}
                className="emi-banner-avatar-image"
              />
            ) : (
              <div className="emi-banner-default-avatar">
                <div className="emi-banner-avatar-icon" />
              </div>
            )}
          </div>
          <div className="emi-banner-user-info">
            <h1 className="emi-banner-username">{username}</h1>
            <p className="emi-banner-user-handle">{userHandle}</p>
            <p className="emi-banner-user-level">{userLevel}</p>
          </div>
        </div>

        {/* Bloque central: Logo EMI */}
        <div className="emi-banner-center-block">
          <img
            src={EMILogo}
            alt="Escuela Mexicana de Inglés"
            className="emi-banner-logo"
          />
        </div>

        {/* Bloque derecho: Vacío por ahora, para futuras funcionalidades */}
        <div className="emi-banner-right-block">
          {/* Aquí podrías agregar elementos adicionales como progreso, badges, etc. */}
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  userAvatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  userLevel: PropTypes.string.isRequired,
};

export default Banner;
