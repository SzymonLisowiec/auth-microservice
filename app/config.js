module.exports = {

  /**
   * WebService configuration
   */
  host: '127.0.0.1',
  port: 8080,

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
  databaseHost: '127.0.0.1',
  databasePort: 27017,
  databaseName: 'auth-microservice',
  databaseUser: null,
  databasePassword: null,

  /**
   * Password Hash
   * Currently supports algorithms: argon2, bcrypt
   */
  passwordHash: 'argon2',

  /**
   * Password Requirements
   */
  passwordMinLength: 6,
  passwordMaxLength: 28,
  passwordConfirmation: true,
  
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
  userNameMinLength: 4,
  userNameMaxLength: 16,

  /**
   * Lookup
   */
  enableLookupByUsername: true,
  enableLookupByEmail: false,

  /**
   * E-Mails normalization with https://www.npmjs.com/package/normalize-email
   * If you enable it, will remove dots (.) and aliases (+foobar) from e-mails.
   */
  normalizeEmails: false,

  /**
   * Tokens
   */
  supportTokens: ['jsonwebtoken'],
  defaultToken: 'jsonwebtoken',
  

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
    registration: 3600, // TODO: add regex key
  },
  confirmationSecretKey: 'foobar',
  confirmationRefreshDelay: 300, // in seconds
  requiredRegistrationConfirmationToLogin: false,
  removeNotConfirmedUsersIn: 864000, // days, 0 to disable

};
