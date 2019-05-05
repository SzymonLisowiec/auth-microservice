***Still development....***
****

<p align="center">
  <a href="https://auth-microservice.kysune.me/" target="_blank">
    <img width="180" src="https://raw.githubusercontent.com/SzymonLisowiec/auth-microservice/master/docs/.vuepress/public/hero.png" alt="logo" />
  </a>
</p>

# Auth-Microservice
Advanced authentication microservice.

# Features
- 🔨 Strongly customizable
- 👥 Ignores e-mail dots and aliases (`+foobar`).
- 🤝 Compatible with `passport.js` strategies.
- 🔒 Supports multiple password hashes. You can change password hash at any time.
- 📝 Additional registration form fields.
- ✍ Confirmations system.
- 📃 [security.txt](https://tools.ietf.org/html/draft-foudil-securitytxt-06) under multiple paths.

# Getting Started

... in future

Current state example
```javascript
const AuthMicroservice = require('..');
const { Strategies } = AuthMicroservice;
    
AuthMicroservice.useStrategy(Strategies.Facebook({
  clientID: '',
  clientSecret: '',
}));

AuthMicroservice.on('confirmation:new', ({ confirmation, user }) => {
  // send e-mail with token
});

AuthMicroservice.run();

```

# Endpoints

## GET /login
Used to login without credentials eg. through Facebook
#### Request
```
/login?strategy=facebook&returnTo=https://example.com/login
/login?strategy=facebook&code=xyz
```
- **strategy** [[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)] - strategy to authenticate user eg. `facebook`
- **returnTo** [[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)] - location to which client returns after authentication on third party service 
- **code** [`Mixed`] - depend on strategy, eg. authorization code

While sending first request server returns `HTTP 302 Redirect` to auth on third party service and after return you should send second request with strategy fields eg. `code` in `facebook` case.
#### Response
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2IyMDI4NGM0ZjY4MjM2ZTRiMjEyNjYiLCJleHAiOjE1NTUyNTAwMzUsImlhdCI6MTU1NTI0NjQzNX0.r0l5vTDFD5iYeMAlrYqb8lJUvcb3RVsja8rZU9kD0bc",
  "expiresAt": 1555250035
}
```

## POST /login
Used to login with client credentials.
#### Request
```json
{
  "strategy": "local",
  "login": "johndoe@example.com", // e-mail or name if usernames are enabled
  "password": "StrongPassword12345"
}
```
#### Response
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2IyMDI4NGM0ZjY4MjM2ZTRiMjEyNjYiLCJleHAiOjE1NTUyNTAwMzUsImlhdCI6MTU1NTI0NjQzNX0.r0l5vTDFD5iYeMAlrYqb8lJUvcb3RVsja8rZU9kD0bc",
  "expiresAt": 1555250035
}
```
Response depend on used token type.

## POST /register
Used to register user or to complete registration.
#### Request
```json
{
  "userId": "5cb38f9fd626f92c241b5836",
  "email": "johndoe@example.com",
  "password": "StrongPassword12345",
  "name": "Kysune"
}
```
- **userId** [[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)] - only to completing registration of exists user
- **email** [[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]
- **password** [[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]
- **passwordConfirmation** [[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)] - you can disable password confirmation in configuration file, but defaults is enabled.
- **name** [[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)] - only if usernames are enabled

You can add additional fields, read more in configuration section.
#### Response
```json
{}
```
Just `HTTP 200 OK`.

## GET /lookup/SEARCH
Used to search user's id by name.
#### Request
```
/lookup/Kysune
```
- **SEARCH** [[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)] - username or e-mail (e-mails lookup is disabled by default)
#### Response
```json
{
    "id": "5cb38f9fd626f92c241b5836",
    "name": "Kysune"
}
```

# Flow
![flow](https://i.imgur.com/0QbHM6e.png)

# Configuration

# TODO
- [x] Confirmations system
- [ ] Changing password
- [ ] Captcha
- [ ] IP logging
- [ ] Requests throttling
- [ ] Two factor authentication
