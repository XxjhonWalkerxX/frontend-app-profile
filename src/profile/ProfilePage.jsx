import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Alert, Hyperlink } from '@openedx/paragon';

// Actions
import {
  fetchProfile,
  saveProfile,
  saveProfilePhoto,
  deleteProfilePhoto,
  openForm,
  closeForm,
  updateDraft,
} from './data/actions';

// Components
import ProfileAvatar from './forms/ProfileAvatar';
import Name from './forms/Name';
import Country from './forms/Country';
import PreferredLanguage from './forms/PreferredLanguage';
import Education from './forms/Education';
import SocialLinks from './forms/SocialLinks';
import Bio from './forms/Bio';
import Certificates from './forms/Certificates';
import AgeMessage from './AgeMessage';
import DateJoined from './DateJoined';
import UsernameDescription from './UsernameDescription';
import PageLoading from './PageLoading';
import Banner from './Banner';
import LearningGoal from './forms/LearningGoal';
import ProfileDashboard from './ProfileDashboard';

// Selectors
import { profilePageSelector } from './data/selectors';

// i18n
import messages from './ProfilePage.messages';

import withParams from '../utils/hoc';

ensureConfig(['CREDENTIALS_BASE_URL', 'LMS_BASE_URL'], 'ProfilePage');

class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const credentialsBaseUrl = context.config.CREDENTIALS_BASE_URL;
    this.state = {
      viewMyRecordsUrl: credentialsBaseUrl ? `${credentialsBaseUrl}/records` : null,
      accountSettingsUrl: context.config.ACCOUNT_SETTINGS_URL,
    };

    this.handleSaveProfilePhoto = this.handleSaveProfilePhoto.bind(this);
    this.handleDeleteProfilePhoto = this.handleDeleteProfilePhoto.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchProfile(this.props.params.username);
    sendTrackingLogEvent('edx.profile.viewed', {
      username: this.props.params.username,
    });
  }

  handleSaveProfilePhoto(formData) {
    this.props.saveProfilePhoto(this.context.authenticatedUser.username, formData);
  }

  handleDeleteProfilePhoto() {
    this.props.deleteProfilePhoto(this.context.authenticatedUser.username);
  }

  handleClose(formId) {
    this.props.closeForm(formId);
  }

  handleOpen(formId) {
    this.props.openForm(formId);
  }

  handleSubmit(formId) {
    this.props.saveProfile(formId, this.context.authenticatedUser.username);
  }

  handleChange(name, value) {
    this.props.updateDraft(name, value);
  }

  isYOBDisabled() {
    const { yearOfBirth } = this.props;
    const currentYear = new Date().getFullYear();
    const isAgeOrNotCompliant = !yearOfBirth || ((currentYear - yearOfBirth) < 13);

    return isAgeOrNotCompliant && getConfig().COLLECT_YEAR_OF_BIRTH !== 'true';
  }

  isAuthenticatedUserProfile() {
    return this.props.params.username === this.context.authenticatedUser.username;
  }

  // Inserted into the DOM in two places (for responsive layout)
  renderViewMyRecordsButton() {
    if (!(this.state.viewMyRecordsUrl && this.isAuthenticatedUserProfile())) {
      return null;
    }

    return (
      <Hyperlink className="btn btn-primary" destination={this.state.viewMyRecordsUrl} target="_blank">
        {this.props.intl.formatMessage(messages['profile.viewMyRecords'])}
      </Hyperlink>
    );
  }

  // Inserted into the DOM in two places (for responsive layout)
  renderHeadingLockup() {
    const { dateJoined } = this.props;

    return (
      <span data-hj-suppress>
        <h1 className="h2 mb-0 font-weight-bold text-truncate">{this.props.params.username}</h1>
        <DateJoined date={dateJoined} />
        {this.isYOBDisabled() && <UsernameDescription />}
        <hr className="d-none d-md-block" />
      </span>
    );
  }

  renderPhotoUploadErrorMessage() {
    const { photoUploadError } = this.props;

    if (photoUploadError === null) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <Alert variant="danger" dismissible={false} show>
            {photoUploadError.userMessage}
          </Alert>
        </div>
      </div>
    );
  }

  renderAgeMessage() {
    const { requiresParentalConsent } = this.props;
    const shouldShowAgeMessage = requiresParentalConsent && this.isAuthenticatedUserProfile();

    if (!shouldShowAgeMessage) {
      return null;
    }
    return <AgeMessage accountSettingsUrl={this.state.accountSettingsUrl} />;
  }

  renderContent() {
    const {
      profileImage,
      name,
      visibilityName,
      country,
      visibilityCountry,
      levelOfEducation,
      visibilityLevelOfEducation,
      socialLinks,
      draftSocialLinksByPlatform,
      visibilitySocialLinks,
      learningGoal,
      visibilityLearningGoal,
      languageProficiencies,
      visibilityLanguageProficiencies,
      courseCertificates,
      visibilityCourseCertificates,
      bio,
      visibilityBio,
      requiresParentalConsent,
      isLoadingProfile,
      username,
      saveState,
      navigate,
    } = this.props;

    if (isLoadingProfile) {
      return <PageLoading srMessage={this.props.intl.formatMessage(messages['profile.loading'])} />;
    }

    if (!username && saveState === 'error' && navigate) {
      navigate('/notfound');
    }

    const commonFormProps = {
      openHandler: this.handleOpen,
      closeHandler: this.handleClose,
      submitHandler: this.handleSubmit,
      changeHandler: this.handleChange,
    };

    const isBlockVisible = (blockInfo) => this.isAuthenticatedUserProfile()
      || (!this.isAuthenticatedUserProfile() && Boolean(blockInfo));

    const isLanguageBlockVisible = isBlockVisible(languageProficiencies.length);
    const isEducationBlockVisible = isBlockVisible(levelOfEducation);
    const isSocialLinksBLockVisible = isBlockVisible(socialLinks.some((link) => link.socialLink !== null));
    const isBioBlockVisible = isBlockVisible(bio);
    const isCertificatesBlockVisible = isBlockVisible(courseCertificates.length);
    const isNameBlockVisible = isBlockVisible(name);
    const isLocationBlockVisible = isBlockVisible(country);

    return (
      <div className="container-fluid">
        {/* CONTENIDO ORIGINAL DEL AVATAR OCULTO */}
        <div className="row align-items-center pt-4 mb-4 pt-md-0 mb-md-0" style={{display: 'none'}}>
          <div className="col-auto col-md-4 col-lg-3">
            <div className="d-flex align-items-center d-md-block">
              <ProfileAvatar
                className="mb-md-3"
                src={profileImage.src}
                isDefault={profileImage.isDefault}
                onSave={this.handleSaveProfilePhoto}
                onDelete={this.handleDeleteProfilePhoto}
                savePhotoState={this.props.savePhotoState}
                isEditable={this.isAuthenticatedUserProfile() && !requiresParentalConsent}
              />
            </div>
          </div>
          <div className="col">
            <div className="d-md-none">
              {this.renderHeadingLockup()}
            </div>
            <div className="d-none d-md-block float-right">
              {this.renderViewMyRecordsButton()}
            </div>
          </div>
        </div>
        {this.renderPhotoUploadErrorMessage()}
        
        {/* CONTENIDO PRINCIPAL - ANCHO 1100PX SIN PADDING */}
        <div className="profile-main-content" style={{maxWidth: '1100px', margin: '0 auto'}}>
          
          {/* CERTIFICADOS AL PRINCIPIO - ESTRUCTURA HORIZONTAL */}
          {isCertificatesBlockVisible && (
            <div className="certificates-container">
              <div className="certificates-layout">
                <div className="courses-section">
                  <h2 className="section-title">Cursos</h2>
                  <div className="courses-content">
                    {/* Contenido de cursos vacío por ahora */}
                  </div>
                </div>
                <div className="certificates-section">
                  <div className="courses-right">
                    <div className="certificates-preview">
                      <div className="certificates-header">
                        <h3 className="certificates-title">Mis Certificados</h3>
                        <span className="certificates-count">{courseCertificates ? courseCertificates.length : 0}</span>
                      </div>
                      <div className="certificates-list">
                        {courseCertificates && courseCertificates.length > 0 ? (
                          courseCertificates.slice(0, 5).map((certificate, idx) => (
                            <div key={certificate.courseId || idx} className="certificate-item">
                              <div className="certificate-info">
                                <h4 className="certificate-name">{certificate.courseDisplayName}</h4>
                                <p className="certificate-org">{certificate.courseOrganization}</p>
                              </div>
                              <a
                                href={certificate.downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="certificate-link"
                              >
                                Ver
                              </a>
                            </div>
                          ))
                        ) : (
                          <div className="no-certificates">No hay certificados disponibles</div>
                        )}
                        {courseCertificates && courseCertificates.length > 5 && (
                          <div className="view-all">
                            <span>+{courseCertificates.length - 5} más</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* MENSAJE DE EDAD - CONTENEDOR CON ANCHO 1100PX */}
          {!this.isYOBDisabled() && (
            <div className="age-message-container">
              {this.renderAgeMessage()}
            </div>
          )}
          
          {/* BIO - CONTENEDOR CON ANCHO 1100PX */}
          {isBioBlockVisible && (
            <div className="bio-container">
              <Bio
                bio={bio}
                visibilityBio={visibilityBio}
                formId="bio"
                {...commonFormProps}
              />
            </div>
          )}
          
          {/* LEARNING GOAL - CONTENEDOR CON ANCHO 1100PX */}
          {getConfig().ENABLE_SKILLS_BUILDER_PROFILE && (
            <div className="learning-goal-container">
              <LearningGoal
                learningGoal={learningGoal}
                visibilityLearningGoal={visibilityLearningGoal}
                formId="learningGoal"
                {...commonFormProps}
              />
            </div>
          )}
        </div>
        
        {/* SECCIONES DESHABILITADAS - OCULTAS */}
        <div style={{display: 'none'}}>
          {false && isNameBlockVisible && (
            <Name
              name={name}
              visibilityName={visibilityName}
              formId="name"
              {...commonFormProps}
            />
          )}
          {false && isLocationBlockVisible && (
            <Country
              country={country}
              visibilityCountry={visibilityCountry}
              formId="country"
              {...commonFormProps}
            />
          )}
          {false && isLanguageBlockVisible && (
            <PreferredLanguage
              languageProficiencies={languageProficiencies}
              visibilityLanguageProficiencies={visibilityLanguageProficiencies}
              formId="languageProficiencies"
              {...commonFormProps}
            />
          )}
          {false && isEducationBlockVisible && (
            <Education
              levelOfEducation={levelOfEducation}
              visibilityLevelOfEducation={visibilityLevelOfEducation}
              formId="levelOfEducation"
              {...commonFormProps}
            />
          )}
          {false && isSocialLinksBLockVisible && (
            <SocialLinks
              socialLinks={socialLinks}
              draftSocialLinksByPlatform={draftSocialLinksByPlatform}
              visibilitySocialLinks={visibilitySocialLinks}
              formId="socialLinks"
              {...commonFormProps}
            />
          )}
        </div>
      </div>
    );
  }

  render() {
    const {
      isLoadingProfile,
      username,
      dateJoined,
      courseCertificates,
      profileImage,
    } = this.props;

    if (isLoadingProfile) {
      return (
        <div className="profile-page">
          <Banner />
          <PageLoading srMessage={this.props.intl.formatMessage(messages['profile.loading'])} />
        </div>
      );
    }

    // Calcular estadísticas dinámicamente
    const certificatesCount = courseCertificates ? courseCertificates.length : 0;
    const coursesCount = certificatesCount; // Por ahora usamos certificados como proxy para cursos
    const hoursCompleted = coursesCount * 36; // Estimación de 36 horas por curso
    // Progreso basado en 8 cursos máximo
    const progressPercentage = Math.min(Math.round((coursesCount / 8) * 100), 100);

    return (
      <div className="profile-page">
        <Banner />
        <ProfileDashboard
          username={username}
          dateJoined={dateJoined}
          coursesCount={coursesCount}
          certificatesCount={certificatesCount}
          hoursCompleted={hoursCompleted}
          progressPercentage={progressPercentage}
          profileImage={profileImage}
          courseCertificates={courseCertificates}
        />
        <div className="profile-content-sections">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

ProfilePage.contextType = AppContext;

ProfilePage.propTypes = {
  // Account data
  requiresParentalConsent: PropTypes.bool,
  dateJoined: PropTypes.string,
  username: PropTypes.string,

  // Bio form data
  bio: PropTypes.string,
  yearOfBirth: PropTypes.number,
  visibilityBio: PropTypes.string.isRequired,

  // Certificates form data
  courseCertificates: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })),
  visibilityCourseCertificates: PropTypes.string.isRequired,

  // Country form data
  country: PropTypes.string,
  visibilityCountry: PropTypes.string.isRequired,

  // Education form data
  levelOfEducation: PropTypes.string,
  visibilityLevelOfEducation: PropTypes.string.isRequired,

  // Language proficiency form data
  languageProficiencies: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })),
  visibilityLanguageProficiencies: PropTypes.string.isRequired,

  // Name form data
  name: PropTypes.string,
  visibilityName: PropTypes.string.isRequired,

  // Social links form data
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    platform: PropTypes.string,
    socialLink: PropTypes.string,
  })),
  draftSocialLinksByPlatform: PropTypes.objectOf(PropTypes.shape({
    platform: PropTypes.string,
    socialLink: PropTypes.string,
  })),
  visibilitySocialLinks: PropTypes.string.isRequired,

  // Learning Goal form data
  learningGoal: PropTypes.string,
  visibilityLearningGoal: PropTypes.string.isRequired,

  // Other data we need
  saveState: PropTypes.oneOf([null, 'pending', 'complete', 'error']),
  savePhotoState: PropTypes.oneOf([null, 'pending', 'complete', 'error']),
  isLoadingProfile: PropTypes.bool.isRequired,

  // Page state helpers
  photoUploadError: PropTypes.objectOf(PropTypes.string),

  // Actions
  fetchProfile: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  saveProfilePhoto: PropTypes.func.isRequired,
  deleteProfilePhoto: PropTypes.func.isRequired,
  openForm: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,

  // Router
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,

  // i18n
  intl: intlShape.isRequired,
};

ProfilePage.defaultProps = {
  saveState: null,
  username: '',
  savePhotoState: null,
  photoUploadError: {},
  name: null,
  yearOfBirth: null,
  levelOfEducation: null,
  country: null,
  socialLinks: [],
  draftSocialLinksByPlatform: {},
  bio: null,
  learningGoal: null,
  languageProficiencies: [],
  courseCertificates: null,
  requiresParentalConsent: null,
  dateJoined: null,
  username: null,
  profileImage: null,
};

export default connect(
  profilePageSelector,
  {
    fetchProfile,
    saveProfilePhoto,
    deleteProfilePhoto,
    saveProfile,
    openForm,
    closeForm,
    updateDraft,
  },
)(injectIntl(withParams(ProfilePage)));
