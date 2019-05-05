---
sidebarDepth: 2
---

# Config

## WebService

### host
- **Type:** `String`
- **Default:** `127.0.0.1`

### port
- **Type:** `String|Integer`
- **Default:** `8080`

## Log

### logging
Auth-microservice uses [winston](https://www.npmjs.com/package/winston) to logging.
- **Type:** `String`
- **Default:** `info`
- **Acceptable values**:
  - error
  - warn
  - info
  - varbose
  - debug
  - silly

E.g. if `logging` is set to `info`, script will logging `info` and all above log levels from **Acceptable values**.

## Administration

### internalApiKey
Internal api key used to authorization in requests to private enpoints.
- **Type:** `String`
- **Default:** `foobar`

## Database

### databaseHost
- **Type:** `String`
- **Default:** `127.0.0.1`

### databasePort
- **Type:** `String|Integer`
- **Default:** `27017`

### databaseName
- **Type:** `String`
- **Default:** `auth-microservice`

### databaseUser
- **Type:** `String|null`
- **Default:** `null`

### databasePassword
- **Type:** `String|null`
- **Default:** `null`

## Passwords

### passwordHash
Password hash algorithm. Currently auth-microservice have build-in two algorithms: `argon2` and `bcrypt`.
- **Type:** `String`
- **Default:** `argon2`

### passwordMinLength
Minimum password length.
- **Type:** `Integer`
- **Default:** `6`

### passwordMaxLength
Maximum password length.
- **Type:** `Integer`
- **Default:** `128`

### passwordConfirmation
Set to `false` if you don't use password confirmation in registration form.
- **Type:** `Boolean`
- **Default:** `true`

### bcryptSaltRounds
BCrypt salt rounds. More details [HERE](https://www.npmjs.com/package/bcrypt#a-note-on-rounds)

## Usernames

### supportUsernames
Set to `false` if you need only e-mails.
- **Type:** `Boolean`
- **Default:** `true`

### userNameCharacters
Allowed characters in username.
- **Type:** `String`
- **Default:** `A-Za-z0-9-_`

### userNameMinLength
Minimum username length.
- **Type:** `Integer`
- **Default:** `4`

### userNameMaxLength
Maximum username length.
- **Type:** `Integer`
- **Default:** `16`

### enableLookupByUsername
Enables lookuping user by name in endpoint `GET /lookup`.
- **Type:** `Boolean`
- **Default:** `true`

## E-mails

### normalizeEmails
Set to `true` if you want to remove dots and aliases (e.g. `+foobar`) from e-mails. More details: [normalize-email](https://www.npmjs.com/package/normalize-email)
- **Type:** `Boolean`
- **Default:** `false`

### enableLookupByEmail
Enables lookuping user by e-mail in endpoint `GET /lookup`.
- **Type:** `Boolean`
- **Default:** `false`

## Tokens

### supportTokens
- **Type:** `Array of Strings`
- **Default:** `['jsonwebtoken']`

### defaultToken
- **Type:** `String`
- **Default:** `jsonwebtoken`

## User

### additionalFields
- **Type:** `Object`
- **Default:** `{}`
- **Example:**
```javascript
{
  birthday: {
    type: Date, // according to https://mongoosejs.com/docs/schematypes.html
    validation: 'required|date', // according to https://www.npmjs.com/package/validatorjs#available-rules
    hidden: false, // set to false if you need display this field in lookup
  },
}
```

## Confirmations

### enableConfirmations
Set to `false` if you don't need confirmations system.
- **Type:** `Boolean`
- **Default:** `true`

### confirmationExpireTime
Confirmation's token expire time by type.
- **Type:** `Object`
- **Unit:** Seconds
- **Default:**
```json
{
  "default": 3600,
  "registration": 3600,
}
```

### confirmationSecretKey
Secret key of confirmation, using to generating tokens.
- **Type:** `String`
- **Default:** `foobar`

### confirmationRefreshDelay
Delay before next confirmation refresh.
- **Type:** `Integer`
- **Unit:** Seconds
- **Default:** `300` (5 minutes)

### requiredRegistrationConfirmationToLogin
Enable to require confirmation of registration.
- **Type:** `Boolean`
- **Default:** `false`

### removeNotConfirmedUsersIn
Period after which users without confirmed registration will be removed.
- **Type:** `Integer`
- **Unit:** Seconds
- **Default:** `864000` (10 days)