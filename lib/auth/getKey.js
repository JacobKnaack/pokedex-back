'use strict';

const jwksClient = require('jwks-rsa');

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

const client = jwksClient({
  // this url comes from your app on the auth0 dashboard 
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = getKey;
