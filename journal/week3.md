# Week 3 — Decentralized Authentication
Finished the checklist items at a slowed pace on vacation. Took on minimal homework for this week.

## Activities Performed
- Set up cognito user pool in AWS Console
- Added cognito environment variables to the react app for interaction with the new user pool
- Implemented an updated sign-in page using real authentication (React, js)
- Implemented a custom confirmation page for sign-up (React, js)
- Implemented a custom recovery page for account recovery (React, js)
- Added server-side jwt authentication and basic authorization for the home feed (Flask, python)

## JWT implementation in backend
I've wanted to work with web tokens for some time so I walked through this lesson multiple times to absorb the flow a little better.
I've also captured some of the basic steps to achieve authentication, as well as some Cognito best practices I identified outside of the lesson

### Typical flow of Authentication with Frontend and Backend
- Create and configure AWS Cognito user pool
- (Optionally) Create and configure an AWS Cognito identity pool
- Add Cognito SDK and usage to forntend application
- Obtain temporary credentials from the AWS Cognito SDK
- Use temporary credentials to access the backend resources
- Limit information based on correctness of temporary credentials

### Best practices for Authentication / Authorization
- Leverage HTTPS over HTTP when communicating with the backend form the frontend (provides transport security)
- Temporary credentials are an industry standard
- The user pool provides substantial out of the box security and scalability
- The identity pool can provide temporary credentials

### What is the identity pool?
Basically the identity pool is responsible for creating temporary credentials. This can been seen in the form of temporary login tokens, or even provide credentials for unauthenticated users depending on the use case. This enables logins from authenticators external to AWS, like Google or Microsoft logins. They link users from an IDP to an IAM role, which lets you provide intentional access to specific AWS services that operate within your system. 
