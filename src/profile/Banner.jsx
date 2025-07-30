import React from 'react';
import PropTypes from 'prop-types';
import styles from './Banner.module.scss';
import EMILogo from './assets/EMI_logo.png';

const Banner = ({
  userAvatar = null,
  username,
  userHandle,
  userLevel,
}) => (
  <div className={styles.banner}>
    {/* Contenedor del fondo borroso */}
    <div className={styles.backgroundContainer}>
      <div className={styles.backgroundImage} />
      <div className={styles.overlay} />
    </div>

    {/* Contenido del banner */}
    <div className={styles.content}>
      {/* Bloque izquierdo: Avatar y datos del usuario */}
      <div className={styles.leftBlock}>
        <div className={styles.avatar}>
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={`${username} avatar`}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.defaultAvatar}>
              <div className={styles.avatarIcon} />
            </div>
          )}
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.username}>{username}</h1>
          <p className={styles.userHandle}>{userHandle}</p>
          <p className={styles.userLevel}>{userLevel}</p>
        </div>
      </div>

      {/* Bloque central: Logo EMI */}
      <div className={styles.centerBlock}>
        <img
          src={EMILogo}
          alt="Escuela Mexicana de Inglés"
          className={styles.logo}
        />
      </div>

      {/* Bloque derecho: Vacío por ahora, para futuras funcionalidades */}
      <div className={styles.rightBlock}>
        {/* Aquí podrías agregar elementos adicionales como progreso, badges, etc. */}
      </div>
    </div>
  </div>
);

Banner.propTypes = {
  userAvatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  userLevel: PropTypes.string.isRequired,
};

export default Banner;
