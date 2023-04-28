"use strict";
const { CognitoJwtVerifier } = require("aws-jwt-verify");

if (!process.env.USER_POOL_ID || !process.env.CLIENT_ID) {
  throw new Error("Missing environment variables: USER_POOL_ID and/or CLIENT_ID are not set.");
}

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID,
  tokenUse: "access",
  clientId: process.env.CLIENT_ID,
});

exports.handler = async (event) => {
  console.log("request:", JSON.stringify(event, undefined, 2));

  const jwt = event.headers.authorization.replace(/^Bearer\s+/i, '');
  console.log("Received JWT:", jwt);
  try {
    const payload = await jwtVerifier.verify(jwt);
    console.log("Access allowed. JWT payload:", payload);
  } catch (err) {
    console.error("Access forbidden:", err);
    return {
      isAuthorized: false,
    };
  }
  return {
    isAuthorized: true,
  };
};