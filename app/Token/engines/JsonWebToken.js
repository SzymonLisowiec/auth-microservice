const JWT = require('jsonwebtoken');

class JWTToken {

  constructor() {

    this.key = process.env.TOKEN_JWT_KEY || 'xyz'; // TODO: Return error/warning while key hasn't set
    this.ttl = process.env.TOKEN_JWT_TTL || 3600; // time to life in seconds

  }

  properties() {
    return {
      exp: Math.floor(Date.now() / 1000) + this.ttl,
    }
  }

  verify(request) {
    let header = request.get('Authorization')
    if (!header) return false;
    header = header.split(' ');
    if (header.length !== 2 || header[0].toLowerCase() !== 'bearer') return false;
    return JWT.verify(header[1], this.key);
  }

  refresh(token) {
    
    let payload = JWT.verify(token, this.key);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;

    payload = {
      ...payload,
      ...this.properties(),
    };
    
    return {
      accessToken: JWT.sign(payload, this.key),
      expiresAt: payload.exp,
    };
  }

  sign(data) {

    const payload = {
      userId: data.id,
      ...this.properties(),
    };

    return {
      accessToken: JWT.sign(payload, this.key),
      expiresAt: payload.exp,
    };
  }

}

module.exports = JWTToken;
