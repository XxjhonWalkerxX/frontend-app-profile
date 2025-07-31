import React from 'react';
import PropTypes from 'prop-types';
import EMILogo from './assets/EMI_logo.png';
import BannerBackground from './assets/banner_classroom.png';

const Banner = ({ username, dateJoined, profileAvatar }) => {
  // Calcular estadísticas simuladas basadas en datos del usuario
  const membershipMonths = dateJoined ? 
    Math.floor((new Date() - new Date(dateJoined)) / (1000 * 60 * 60 * 24 * 30)) : 0;
  
  const stats = {
    courses: Math.min(Math.floor(membershipMonths / 2) + 1, 12),
    certificates: Math.min(Math.floor(membershipMonths / 4), 6),
    studyHours: Math.min(membershipMonths * 8 + 24, 200)
  };

  return (
    <div className="emi-banner">
      {/* Fondo mejorado con patrones */}
      <div className="emi-banner-background-container">
        <div 
          className="emi-banner-background-image"
          style={{ backgroundImage: `url(${BannerBackground})` }}
        />
        <div className="emi-banner-overlay" />
      </div>

      {/* Contenido del banner */}
      <div className="emi-banner-content">
        {/* Logo EMI (izquierda) */}
        <div className="emi-banner-section emi-banner-left">
          <div className="emi-banner-logo-container">
            <img
              src={EMILogo}
              alt="Escuela Militar de Ingeniería"
              className="emi-banner-logo"
            />
          </div>
        </div>

        {/* Avatar y datos del usuario (centro) */}
        <div className="emi-banner-section emi-banner-center">
          <div className="emi-banner-avatar-container">
            {profileAvatar}
          </div>
          <div className="emi-banner-user-info">
            <h1 className="emi-banner-username">{username}</h1>
            <p className="emi-banner-member-since">
              Miembro desde {dateJoined}
            </p>
            
            {/* Estadísticas del usuario */}
            <div className="emi-banner-user-stats">
              <div className="emi-banner-stat">
                <span className="stat-number">{stats.courses}</span>
                <span className="stat-label">Cursos</span>
              </div>
              <div className="emi-banner-stat">
                <span className="stat-number">{stats.certificates}</span>
                <span className="stat-label">Certificados</span>
              </div>
              <div className="emi-banner-stat">
                <span className="stat-number">{stats.studyHours}</span>
                <span className="stat-label">Horas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional (derecha) */}
        <div className="emi-banner-section emi-banner-right">
          <div className="emi-banner-info-card">
            <div className="info-title">Estado Académico</div>
            <div className="info-content">Estudiante Activo</div>
          </div>
          
          <div className="emi-banner-info-card">
            <div className="info-title">Nivel</div>
            <div className="info-content">
              {membershipMonths < 6 ? 'Principiante' : 
               membershipMonths < 18 ? 'Intermedio' : 'Avanzado'}
            </div>
          </div>
          
          <div className="emi-banner-info-card">
            <div className="info-title">Progreso</div>
            <div className="info-content">{Math.min(membershipMonths * 5 + 15, 95)}%</div>
          </div>
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
