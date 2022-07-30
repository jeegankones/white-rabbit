export const AUTH_ERROR_CODES_MAP = {
  adminOnlyOperation: 'auth/admin-restricted-operation',
  argumentError: 'auth/argument-error',
  appNotAuthorized: 'auth/app-not-authorized',
  appNotInstalled: 'auth/app-not-installed',
  captchaCheckFailed: 'auth/captcha-check-failed',
  codeExpired: 'auth/code-expired',
  cordovaNotReady: 'auth/cordova-not-ready',
  corsUnsupported: 'auth/cors-unsupported',
  credentialAlreadyInUse: 'auth/credential-already-in-use',
  credentialMismatch: 'auth/custom-token-mismatch',
  credentialTooOldLoginAgain: 'auth/requires-recent-login',
  dependentSdkInitBeforeAuth: 'auth/dependent-sdk-initialized-before-auth',
  dynamicLinkNotActivated: 'auth/dynamic-link-not-activated',
  emailChangeNeedsVerification: 'auth/email-change-needs-verification',
  emailExists: 'auth/email-already-in-use',
  emulatorConfigFailed: 'auth/emulator-config-failed',
  expiredOobCode: 'auth/expired-action-code',
  expiredPopupRequest: 'auth/cancelled-popup-request',
  internalError: 'auth/internal-error',
  invalidApiKey: 'auth/invalid-api-key',
  invalidAppCredential: 'auth/invalid-app-credential',
  invalidAppId: 'auth/invalid-app-id',
  invalidAuth: 'auth/invalid-user-token',
  invalidAuthEvent: 'auth/invalid-auth-event',
  invalidCertHash: 'auth/invalid-cert-hash',
  invalidCode: 'auth/invalid-verification-code',
  invalidContinueUri: 'auth/invalid-continue-uri',
  invalidCordovaConfiguration: 'auth/invalid-cordova-configuration',
  invalidCustomToken: 'auth/invalid-custom-token',
  invalidDynamicLinkDomain: 'auth/invalid-dynamic-link-domain',
  invalidEmail: 'auth/invalid-email',
  invalidEmulatorScheme: 'auth/invalid-emulator-scheme',
  invalidIdpResponse: 'auth/invalid-credential',
  invalidMessagePayload: 'auth/invalid-message-payload',
  invalidMfaSession: 'auth/invalid-multi-factor-session',
  invalidOauthClientId: 'auth/invalid-oauth-client-id',
  invalidOauthProvider: 'auth/invalid-oauth-provider',
  invalidOobCode: 'auth/invalid-action-code',
  invalidOrigin: 'auth/unauthorized-domain',
  invalidPassword: 'auth/wrong-password',
  invalidPersistence: 'auth/invalid-persistence-type',
  invalidPhoneNumber: 'auth/invalid-phone-number',
  invalidProviderId: 'auth/invalid-provider-id',
  invalidRecipientEmail: 'auth/invalid-recipient-email',
  invalidSender: 'auth/invalid-sender',
  invalidSessionInfo: 'auth/invalid-verification-id',
  invalidTenantId: 'auth/invalid-tenant-id',
  mfaInfoNotFound: 'auth/multi-factor-info-not-found',
  mfaRequired: 'auth/multi-factor-auth-required',
  missingAndroidPackageName: 'auth/missing-android-pkg-name',
  missingAppCredential: 'auth/missing-app-credential',
  missingAuthDomain: 'auth/auth-domain-config-required',
  missingCode: 'auth/missing-verification-code',
  missingContinueUri: 'auth/missing-continue-uri',
  missingIframeStart: 'auth/missing-iframe-start',
  missingIosBundleId: 'auth/missing-ios-bundle-id',
  missingOrInvalidNonce: 'auth/missing-or-invalid-nonce',
  missingMfaInfo: 'auth/missing-multi-factor-info',
  missingMfaSession: 'auth/missing-multi-factor-session',
  missingPhoneNumber: 'auth/missing-phone-number',
  missingSessionInfo: 'auth/missing-verification-id',
  moduleDestroyed: 'auth/app-deleted',
  needConfirmation: 'auth/account-exists-with-different-credential',
  networkRequestFailed: 'auth/network-request-failed',
  nullUser: 'auth/null-user',
  noAuthEvent: 'auth/no-auth-event',
  noSuchProvider: 'auth/no-such-provider',
  operationNotAllowed: 'auth/operation-not-allowed',
  operationNotSupported: 'auth/operation-not-supported-in-this-environment',
  popupBlocked: 'auth/popup-blocked',
  popupClosedByUser: 'auth/popup-closed-by-user',
  providerAlreadyLinked: 'auth/provider-already-linked',
  quotaExceeded: 'auth/quota-exceeded',
  redirectCancelledByUser: 'auth/redirect-cancelled-by-user',
  redirectOperationPending: 'auth/redirect-operation-pending',
  rejectedCredential: 'auth/rejected-credential',
  secondFactorAlreadyEnrolled: 'auth/second-factor-already-in-use',
  secondFactorLimitExceeded: 'auth/maximum-second-factor-count-exceeded',
  tenantIdMismatch: 'auth/tenant-id-mismatch',
  timeout: 'auth/timeout',
  tokenExpired: 'auth/user-token-expired',
  tooManyAttemptsTryLater: 'auth/too-many-requests',
  unauthorizedDomain: 'auth/unauthorized-continue-uri',
  unsupportedFirstFactor: 'auth/unsupported-first-factor',
  unsupportedPersistence: 'auth/unsupported-persistence-type',
  unsupportedTenantOperation: 'auth/unsupported-tenant-operation',
  unverifiedEmail: 'auth/unverified-email',
  userCancelled: 'auth/user-cancelled',
  userDeleted: 'auth/user-not-found',
  userDisabled: 'auth/user-disabled',
  userMismatch: 'auth/user-mismatch',
  userSignedOut: 'auth/user-signed-out',
  weakPassword: 'auth/weak-password',
  webStorageUnsupported: 'auth/web-storage-unsupported',
  alreadyInitialized: 'auth/already-initialized',
};
