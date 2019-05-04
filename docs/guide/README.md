# Auth Microservice

::: danger
Auth Microservice is still development.
:::

## Getting Started

### Install auth-microservice

```
npm i --save auth-microservice
```

### Let's code
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

### Run
```shell
> node examples/auth
[2019-05-04 21:57:48][Strategies][info] Used facebook strategy.
[2019-05-04 21:57:48][Database][info] Connected to database mongodb://127.0.0.1:27017/auth-microservice
[2019-05-04 21:57:48][WebService][info] Listening on 127.0.0.1:8080...
```