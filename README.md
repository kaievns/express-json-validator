# Express JSON Validator

This project is a simple and application forward [express.js](https://expressjs.com)
validation middleware generator that uses [JSON Schemas](http://json-schema.org)
as the source of configuration.

__WHY__: basically, i want the point and shoot type of development experience.
plus consistency of the error messages and ease of custom integrations.

## Installation & Usage

```
npm install express-json-validator --save
```

```js
const express = require('express');
const { validate, ValidationError } = require('express-json-validator');
const schema = {
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  },
  required: [ 'username', 'password' ]
};

const app = express();

app.post('/signin', validate(schema), (req, res) => {
  // HOORAY, validated data!
  const { username, password } = req.body;

  // do useful stuff here
});

// HOORAY consistent errors handling!
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(422).send(err.message);
  } else {
    next();
  }
});
```

## Data Envelopes Support

If you're using rails-ish data envelopes for your params, meaning, `user[username]`
and `user[password]` instead of plain `username` and `password`. This package
allows you to specify the `envelope` option.

```js
app.post('/signup', validate(schema, envelope: 'user')), (req, res) => {
  const { user: {username, password} } = req.body;

  User.create({username, password}).save().then(user => {
    res.send(user);
  });
});
```

## Copyright & License

All code in this repository is released under the terms of the ISC license.

Copyright (C) 2016 Nikolay Nemshilov
