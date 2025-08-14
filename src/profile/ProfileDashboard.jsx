import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage, FormattedDate, injectIntl,
} from '@edx/frontend-platform/i18n';

import messages from './ProfileDashboard.messages';

const ProfileDashboard = ({
  username,
  dateJoined,
  coursesCount,
  certificatesCount,
  hoursCompleted,
  progressPercentage,
}) => {
  const formattedDate = dateJoined ? new Date(dateJoined) : new Date();

  return (
    <div className="profile-dashboard-overlay">
      <div className="dashboard-card">
        <div className="dashboard-content">
          <div className="avatar-section">
            <div className="profile-avatar">
              <img src="/assets/profile_pic.png" alt={username} />
            </div>
          </div>

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

            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{coursesCount}</span>
                <div className="stat-label">
                  <FormattedMessage {...messages['profile.dashboard.courses']} />
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-number">{certificatesCount}</span>
                <div className="stat-label">
                  <FormattedMessage {...messages['profile.dashboard.certificates']} />
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-number">{hoursCompleted}</span>
                <div className="stat-label">
                  <FormattedMessage {...messages['profile.dashboard.hoursCompleted']} />
                </div>
              </div>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">
              <FormattedMessage {...messages['profile.dashboard.progress']} />
            </div>
            <div className="progress-value">{progressPercentage}%</div>
            <div className="progress-text">Progreso</div>
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
};

ProfileDashboard.defaultProps = {
  dateJoined: null,
  coursesCount: 0,
  certificatesCount: 0,
  hoursCompleted: 0,
  progressPercentage: 0,
};

export default injectIntl(ProfileDashboard);
