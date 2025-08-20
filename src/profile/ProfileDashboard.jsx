import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage, FormattedDate, injectIntl,
} from '@edx/frontend-platform/i18n';

import messages from './ProfileDashboard.messages';
import profilePicImage from './assets/profile_pic.png';

const ProfileDashboard = ({
  username,
  dateJoined,
  coursesCount,
  certificatesCount,
  hoursCompleted,
  progressPercentage,
  profileImage,
}) => {
  const formattedDate = dateJoined ? new Date(dateJoined) : new Date();

  // Debug para ver qué imagen tenemos disponible
  console.log('ProfileDashboard Debug:', {
    profileImage,
    hasSrc: profileImage && profileImage.src,
    src: profileImage ? profileImage.src : 'no profileImage',
    isDefault: profileImage ? profileImage.isDefault : 'no isDefault flag',
    customImage: profilePicImage
  });

  // Usar la imagen personalizada EMI en lugar de la imagen por defecto del sistema
  // Si el usuario tiene una imagen real (no la por defecto), usarla, sino usar nuestra imagen EMI
  const avatarSrc = (profileImage && profileImage.src && !profileImage.isDefault && 
                    !profileImage.src.includes('default_500')) 
    ? profileImage.src 
    : profilePicImage;

  return (
    <div className="profile-dashboard-overlay">
      <div className="dashboard-card">
        <div className="dashboard-content">
          
          {/* IZQUIERDA - Avatar + Información del usuario + Estadísticas (45%) */}
          <div className="left-content">
            {/* Avatar que sobresale en la esquina superior izquierda */}
            <div className="avatar-section">
              <div className="profile-avatar">
                <img src={avatarSrc} alt={username} />
              </div>
            </div>

            {/* Información del usuario */}
            <div className="user-info-section">
              <h1 className="username">{username}</h1>
              <div className="user-status">
                <FormattedMessage {...messages['profile.dashboard.active']} />
              </div>
              <div className="member-since">
                <FormattedMessage
                  {...messages['profile.dashboard.memberSince']}
                  values={{
                    date: <FormattedDate value={formattedDate} month="long" year="numeric" />,
                  }}
                />
              </div>
            </div>

            {/* Estadísticas debajo de la información del usuario */}
            <div className="stats-section">
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{coursesCount}</span>
                  <div className="stat-label">CURSOS</div>
                </div>
                
                <div className="stat-item">
                  <span className="stat-number">{certificatesCount}</span>
                  <div className="stat-label">CERTIFICADOS</div>
                </div>
                
                <div className="stat-item">
                  <span className="stat-number">{hoursCompleted}</span>
                  <div className="stat-label">HORAS</div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTRO - Vacío (30%) */}
          <div className="center-section">
            {/* Centro completamente vacío */}
          </div>

          {/* DERECHA - Progreso (25%) */}
          <div className="progress-section">
            <div className="progress-label">OVERALL PROGRESS</div>
            <div className="progress-value">{progressPercentage}%</div>
            <div className="progress-text">PROGRESO</div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

ProfileDashboard.propTypes = {
  username: PropTypes.string.isRequired,
  dateJoined: PropTypes.string,
  coursesCount: PropTypes.number,
  certificatesCount: PropTypes.number,
  hoursCompleted: PropTypes.number,
  progressPercentage: PropTypes.number,
  profileImage: PropTypes.shape({
    src: PropTypes.string,
    isDefault: PropTypes.bool,
  }),
};

ProfileDashboard.defaultProps = {
  dateJoined: null,
  coursesCount: 0,
  certificatesCount: 0,
  hoursCompleted: 0,
  progressPercentage: 0,
  profileImage: null,
};

export default injectIntl(ProfileDashboard);
