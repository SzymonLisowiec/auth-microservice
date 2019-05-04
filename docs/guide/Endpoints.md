# Endpoints

## Introduction

Server always responds in json content. On failure responds appropriate HTTP status code and json content.

## GET /login <Badge text="public" type="info"/>
Used to login without credentials eg. through Facebook

### Request
```
GET /login?strategy=facebook&returnTo=https://example.com/login
GET /login?strategy=facebook&code=xyz
```
- **URL query parameters:**
  - `strategy` - strategy to authenticate user eg. `facebook`
  - `returnTo` - location to which client returns after authentication on third party service 
  - `code` - depend on strategy, eg. authorization code

### Response
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2IyMDI4NGM0ZjY4MjM2ZTRiMjEyNjYiLCJleHAiOjE1NTUyNTAwMzUsImlhdCI6MTU1NTI0NjQzNX0.r0l5vTDFD5iYeMAlrYqb8lJUvcb3RVsja8rZU9kD0bc",
  "expiresAt": 1555250035
}
```


## POST /login <Badge text="public" type="info"/>
Used to login with client credentials.

### Request
```
POST /login HTTP/1.1

{
  "strategy": "local",
  "login": "johndoe@example.com", // e-mail or name if usernames are enabled
  "password": "StrongPassword12345"
}
```
- **Arguments:**
  - `strategy` - strategy to authenticate user eg. `local`
  - `login`
  - `password`

### Response
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2IyMDI4NGM0ZjY4MjM2ZTRiMjEyNjYiLCJleHAiOjE1NTUyNTAwMzUsImlhdCI6MTU1NTI0NjQzNX0.r0l5vTDFD5iYeMAlrYqb8lJUvcb3RVsja8rZU9kD0bc",
  "expiresAt": 1555250035
}
```


## POST /register <Badge text="public" type="info"/>
Used to register user or to complete registration.

### Request
```json
{
  "userId": "5cb38f9fd626f92c241b5836",
  "email": "johndoe@example.com",
  "password": "StrongPassword12345",
  "name": "Kysune"
}
```
- **Arguments:**
  - `userId` - pass this argument only while you complementing registration process.
  - `email`
  - `password`
  - `passwordConfirmation` - you can disable password confirmation in configuration.
  - `name` - pass this argument only while using usernames is enabled

You can use additional fields, [read more](/api/Config.html#additionalfields).

### Response
Just `HTTP/1.1 200 OK`


## GET /lookup/:search <Badge text="public" type="info"/>
Used to search user's id by name.

### Request
```
GET /lookup/Kysune
```
- **URL parameters:**
  - `:search` - username or e-mail (e-mails lookup is disabled by default)
### Response
```json
{
    "id": "5cb38f9fd626f92c241b5836",
    "name": "Kysune"
}
```


## GET /assign <Badge text="public" type="info"/>
Assigns third party accounts to already registered user. Same as [GET /login](/guide/Endpoints.html#get-login), but on successed responds only
```
HTTP/1.1 200 OK

{}
```


## POST /confirmations/new <Badge text="private" type="error"/>
Generates new confirmation.

### Request
```
POST /confirmations/new HTTP/1.1

{
  "userId": "5cb38f9fd626f92c241b5836",
  "type": "removeProject1"
}
```
- **Arguments:**
  - `userId`
  - `type` - unique confirmation key
  - `meta`

### Response
Just `HTTP/1.1 200 OK`

## GET /confirmations/confirm/:token <Badge text="public" type="info"/>
Confirmes active confirmation.

### Request
```
GET /confirmations/confirm/81c3acc3967b97e398bb70ef92ecc8cf9af3515328e7e0e34076b8f88225773d
```
- **URL parameters:**
  - `token`

### Response
Just `HTTP/1.1 200 OK`

## GET /confirmations/refresh/:type <Badge text="public" type="info"/>
Refreshes expired confirmation.

### Request
```
GET /confirmations/refresh/removeProject1
```
- **URL parameters:**
  - `type` - unique confirmation key

### Response
Just `HTTP/1.1 200 OK`

## GET /confirmations/isConfirmed/:type <Badge text="public" type="info"/>
Checks if confirmation is confirmed.

### Request
```
GET /confirmations/isConfirmed/removeProject1
```
- **URL parameters:**
  - `type` - unique confirmation key

### Response
```json
{
  "confirmed": true
}
```