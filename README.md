***Auth-Microservice is further developed and some elements are subject to change. Currently please do not use it on production.***
****

<p align="center">
  <a href="https://auth-microservice.kysune.me/" target="_blank">
    <img width="180" src="https://raw.githubusercontent.com/SzymonLisowiec/auth-microservice/master/docs/.vuepress/public/hero.png" alt="logo" />
  </a>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/auth-microservice?minimal=true"><img src="https://img.shields.io/npm/dm/auth-microservice.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/auth-microservice"><img src="https://img.shields.io/npm/v/auth-microservice.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/auth-microservice"><img src="https://img.shields.io/npm/l/auth-microservice.svg" alt="License"></a>
</p>

# Auth-Microservice
Advanced authentication microservice.

#### - [GETTING STARTED](https://auth-microservice.kysune.me/guide/#getting-started)
#### - [DOCUMENTATION](https://auth-microservice.kysune.me/)
#### - [API](https://auth-microservice.kysune.me/api/)

# Features
- 🔨 Strongly customizable
- 👥 Ignores e-mail dots and aliases (`+foobar`).
- 🤝 Compatible with `passport.js` strategies.
- 🔒 Supports multiple password hashes. You can change password hash at any time.
- 📝 Additional registration form fields.
- ✍ Confirmations system.
- 📃 [security.txt](https://tools.ietf.org/html/draft-foudil-securitytxt-06) under multiple paths.

# TODO
- [x] Confirmations system
- [ ] Changing password (I plan to base it on the confirmations)
- [ ] Captcha
- [ ] IP logging
- [ ] Requests throttling
- [ ] Two factor authentication
- [ ] Improve responding on failed requests.

# License
[MIT](https://github.com/SzymonLisowiec/auth-microservice/blob/master/LICENSE.md)
