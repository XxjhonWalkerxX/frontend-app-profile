import React from 'react';
import PropTypes from 'prop-types';
import styles from './Banner.module.scss';
import EMILogo from './assets/EMI_logo.png';

const Banner = ({
  userAvatar,
  username,
  userHandle,
  dateJoined,
  progressPercent,
  level,
  location,
}) => {
  const memberSince = dateJoined
    ? `Member since ${new Date(dateJoined).getFullYear()}`
    : '';

  return (
    <div className={styles.banner}>
      {/* IZQUIERDA */}
      <div className={styles.leftBlock}>
        {userAvatar ? (
          <img src={userAvatar} alt="avatar" className={styles.avatarImage}/>
        ) : (
          <div className={styles.defaultAvatar} />
        )}
        <div className={styles.userInfo}>
          <h2 className={styles.username}>{username}</h2>
          <p className={styles.handle}>{userHandle}</p>
          <p className={styles.levelLocation}>
            Level {level} &ndash; {location}
          </p>
        </div>
      </div>

      {/* CENTRO */}
      <div className={styles.centerBlock}>
        <img src={EMILogo} alt="Escuela Mexicana de Inglés" className={styles.logo}/>
      </div>

      {/* DERECHA */}
      <div className={styles.rightBlock}>
        <div className={styles.levelBadge}>Level {level}</div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className={styles.percentText}>{progressPercent}%</div>
        <div className={styles.completedText}>COMPLETED</div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  userAvatar:      PropTypes.string,
  username:        PropTypes.string.isRequired,
  userHandle:      PropTypes.string.isRequired,
  dateJoined:      PropTypes.string,
  progressPercent: PropTypes.number.isRequired,
  level:           PropTypes.string.isRequired,
  location:        PropTypes.string.isRequired,
};

Banner.defaultProps = {
  userAvatar: null,
  dateJoined: null,
};

export default Banner;
