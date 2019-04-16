module.exports = {

  /**
   * WebService configuration
   */
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 8080,

  /**
   * Logging
   */
  logging: process.env.DEBUG ? 'debug' : 'info',

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
    birthday: {
      type: Date,
      validation: 'required|date',
    },
  },

  /**
   * Strategies
   */
  strategies: (process.env.STRATEGIES || 'local,facebook').split(',').map(strategy => strategy.trim().toLowerCase()).filter(strategy => /^[a-z0-9\-\_]{1,}$/),

  /**
   * Settings for Facebook strategy
   */
  facebookClientId: process.env.FACEBOOK_CLIENT_ID || null,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || null,
  facebookScope: (process.env.FACEBOOK_SCOPE || 'public_profile,email').split(','),

};
