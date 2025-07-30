import React from 'react';
import PropTypes from 'prop-types';
import styles from './Banner.module.scss';
import EMILogo from './assets/EMI_logo.png';

const Banner = ({ 
  userAvatar, 
  username, 
  userHandle, 
  userLevel,
  name,
  dateJoined
}) => {
  // Función para formatear la fecha de ingreso
  const formatMemberSince = (date) => {
    if (!date) return 'Member since 2025';
    const year = new Date(date).getFullYear();
    return `Member since ${year}`;
  };

  // Usar el nombre real si está disponible, sino el username
  const displayName = name || username || 'User';
  const displayHandle = userHandle || (username ? `@${username}` : '@user');
  const displayLevel = userLevel || formatMemberSince(dateJoined);

  return (
    <div className={styles.banner}>
      {/* Contenedor del fondo borroso */}
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.overlay}></div>
      </div>
      
      {/* Contenido del banner */}
      <div className={styles.content}>
        {/* Bloque izquierdo: Avatar y datos del usuario */}
        <div className={styles.leftBlock}>
          <div className={styles.avatar}>
            {userAvatar && !userAvatar.includes('default') ? (
              <img 
                src={userAvatar} 
                alt={`${displayName} avatar`}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.defaultAvatar}>
                <div className={styles.avatarIcon}></div>
              </div>
            )}
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.username}>{displayName}</h1>
            <p className={styles.userHandle}>{displayHandle}</p>
            <p className={styles.userLevel}>{displayLevel}</p>
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
};

Banner.propTypes = {
  userAvatar: PropTypes.string,
  username: PropTypes.string,
  userHandle: PropTypes.string,
  userLevel: PropTypes.string,
  name: PropTypes.string,
  dateJoined: PropTypes.string,
};

Banner.defaultProps = {
  userAvatar: null,
  username: '',
  userHandle: '',
  userLevel: '',
  name: '',
  dateJoined: null,
};

export default Banner;
