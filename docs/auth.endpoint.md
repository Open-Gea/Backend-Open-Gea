# Endpoints

---

# Register User

## POST `/auth/signup`


### Example

```json
{
	
    "name": "Gaile",
    "lastname": "Beesey",
    "email": "gbeesey0@parallels.com",
    "username": "gbeesey0",
    "country": "Argentina",
    "phone": "218 858 3929",
    "password": "fU7cFO_Cgw"
    
}
```

---

Successfully response


```json
true
```

---


After a user sign-up, he/she must verify his/her email by the next endpoint:

# Verifying Email

## POST `/auth/verify-email`

Technicaly, the original process use this endpoint by sending a request from a link provided in the inbox email througth the front end app. 

You can hardcode the "token" by looking it in the database register in *users* table, by the name of *reset_token*  

### Example

```json
{
	
    "token": ".....", // put the reset_token from gbeesey0@parallels.com user
    "email": "gbeesey0@parallels.com"
    
}
```

---

successfully response

```json
true
```

Now you are able to log in

# Resend Verification Email

## POST `/auth/resend-verification-email`

After some time, if the user do not verify his email, he can use this endpoint to resent de verification email

### Example

```json
{
    "email": "gbeesey0@parallels.com"
}
```

---

successfully response

```json
true
```

# Log In User

## POST `/auth/login`

### Example

```json
{
    
    "email": "gbeesey0@parallels.com",
    "password": "fU7cFO_Cgw"
    
}
```
successfully response

```json
{
	
    "id": "8f55e813-f186-43b0-85ea-4e7f579aa1a8",
    "name": "Gaile",
    "lastname": "Beesey",
    "phone": "218 858 3929",
    "country": "Argentina",
    "email": "gbeesey0@parallels.com",
    "username": "gbeesey0",
    "acceptedTermsConditions": true,
    "createdAt": "2023-12-01T13:26:47.331Z",
    "resetToken": null,
    "resetTokenExpires": null,
    "description": null,
    "profile_picture": null,
    "status": "ACTIVE",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZjU1ZTgxMy1mMTg2LTQzYjAtODVlYS00ZTdmNTc5YWExYTgiLCJpYXQiOjE3MDE0NDM4ODgsImV4cCI6MTcwMTQ0NzQ4OH0.lddN2_DTiDnT1SkWDzj8cK3aGH5itynw3jstMQP8GgM"

}
```

# Forgot Password

## POST `/auth/forgot-password`

When a user forgot his password, he use this endpoint to send a recover verification email

### Example

```json
{
    "email": "gbeesey0@parallels.com"
}
```

successfully response

```json
{
    "message": "Password reset email sent"
}
```

# Recover Password

## POST `/auth/recover-password`

Now the user must set the new password with a similar approach than *Verifying Email*. So you can hardoce the *token* by the same way

### Example

```json
{
    "token":"....", //reset token here,
    "password": "fU7cFO_tre"
}
```

# Contact Us

## POST `/auth/contact-us`

This endpoint send a message to the email administrator configured by GEA_EMAIL and a copy to the user email

### Example

```json
{
    "email": "gbeesey0@parallels.com",
    "name": "Gaile",
    "message": "I want to be part of Gea",
    "country": "Argentina"
}
```

Successfully Response

```json
"Contact message sent"
```

