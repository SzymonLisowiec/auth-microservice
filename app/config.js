module.exports = {

  /**
   * WebService configuration
   */
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 8080,

  /**
   * Logging
   */
  logging: process.env.SILENT ? 'error' : (process.env.DEBUG ? 'debug' : 'info'),

  /**
   * Internal API key
   */
  internalApiKey: 'foobar',

  /**
   * Database configuration
   */
  databaseHost: process.env.DB_HOST || '127.0.0.1',
  databasePort: process.env.DB_PORT || 27017,
  databaseName: process.env.DB_NAME || 'auth-microservice',
  databaseUser: process.env.DB_USER || null,
  databasePassword: process.env.DB_PASSWORD || null,

  /**
   * Password Hash
   * Currently supports algorithms: argon2, bcrypt
   */
  passwordHash: process.env.PASSWORD_HASH || 'argon2',

  /**
   * Password Requirements
   */
  passwordMinLength: process.env.PASSWORD_MIN_LENGTH || 6,
  passwordMaxLength: process.env.PASSWORD_MAX_LENGTH || 128,
  passwordConfirmation: !!process.env.PASSWORD_CONFIRMATION || true,
  
  /**
   * BCrypt salt rounds
   * https://www.npmjs.com/package/bcrypt#a-note-on-rounds
   */
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || 10),

  /**
   * Support usernames
   * Set to false if you need identyfing users only by e-mail.
   */
  supportUsernames: true,
  userNameCharacters: 'A-Za-z0-9-_',
  userNameMinLength: parseInt(process.env.USER_NAME_MIN_LENGTH || 4),
  userNameMaxLength: parseInt(process.env.USER_NAME_MAX_LENGTH || 16),

  /**
   * Lookup
   */
  enableLookupByUsername: !!process.env.LOOKUP_BY_USERNAME || true,
  enableLookupByEmail: !!process.env.LOOKUP_BY_EMAIL || false,

  /**
   * E-Mails normalization with https://www.npmjs.com/package/normalize-email
   * If you enable it, will remove dots (.) and aliases (+foobar) from e-mails.
   */
  normalizeEmails: !!process.env.NORMALIZE_EMAILS || true,

  /**
   * Tokens
   */
  supportTokens: (process.env.SUPPORT_TOKENS || 'jsonwebtoken').split(',').map(token => token.trim().toLowerCase()),
  defaultToken: (process.env.DEFAULT_TOKEN || 'jsonwebtoken'),
  

  /**
   * Additional fields
   */
  additionalFields: {
    // birthday: {
    //   type: Date,
    //   validation: 'required|date',
    // },
  },

  /**
   * Confirmations
   */
  enableConfirmations: true,
  confirmationExpireTime: {
    // in seconds
    default: 3600,
    registration: 3600,
  },
  confirmationSecretKey: 'foobar',
  confirmationRefreshDelay: 300, // in seconds
  requiredRegistrationConfirmationToLogin: true,
  removeNotConfirmedAccountsIn: 10, // days, 0 to disable

};
