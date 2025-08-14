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
          
          {/* COLUMNA IZQUIERDA - Sección de progreso */}
          <div className="progress-section">
            <div className="progress-header">
              <div className="progress-label">
                <FormattedMessage {...messages['profile.dashboard.progress']} />
              </div>
              <div className="progress-value">{progressPercentage}%</div>
              <div className="progress-text">Progreso</div>
            </div>
            
            <div className="progress-items">
              <div className="progress-item">
                <div className="item-header">
                  <span className="item-label">
                    <FormattedMessage {...messages['profile.dashboard.courses']} />
                  </span>
                  <span className="item-value">{coursesCount}</span>
                </div>
                <div className="item-progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(coursesCount * 20, 100)}%` }}></div>
                </div>
              </div>
              
              <div className="progress-item">
                <div className="item-header">
                  <span className="item-label">
                    <FormattedMessage {...messages['profile.dashboard.certificates']} />
                  </span>
                  <span className="item-value">{certificatesCount}</span>
                </div>
                <div className="item-progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(certificatesCount * 25, 100)}%` }}></div>
                </div>
              </div>
              
              <div className="progress-item">
                <div className="item-header">
                  <span className="item-label">
                    <FormattedMessage {...messages['profile.dashboard.hoursCompleted']} />
                  </span>
                  <span className="item-value">{hoursCompleted}h</span>
                </div>
                <div className="item-progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(hoursCompleted / 2, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA - Contenido principal */}
          <div className="main-content">
            
            {/* Header con información del usuario y avatar */}
            <div className="main-header">
              <div className="header-info">
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
              
              <div className="header-avatar">
                <div className="profile-avatar">
                  <img src={avatarSrc} alt={username} />
                </div>
              </div>
            </div>

            {/* Grid de tarjetas de datos */}
            <div className="data-cards">
              <div className="data-card">
                <span className="card-number">{coursesCount}</span>
                <span className="card-label">
                  <FormattedMessage {...messages['profile.dashboard.courses']} />
                </span>
              </div>
              
              <div className="data-card">
                <span className="card-number">{certificatesCount}</span>
                <span className="card-label">
                  <FormattedMessage {...messages['profile.dashboard.certificates']} />
                </span>
              </div>
              
              <div className="data-card">
                <span className="card-number">{hoursCompleted}</span>
                <span className="card-label">
                  <FormattedMessage {...messages['profile.dashboard.hoursCompleted']} />
                </span>
              </div>
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
