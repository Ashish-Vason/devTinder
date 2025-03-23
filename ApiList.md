# API Flow Structure

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## requestRouter

POST request/send/interested/:userId
POST request/send/ignore/:userId
POST request/review/accepted/:requestId
POST request/review/rejected/:requestId

## userRouter

GET /user/connections
GET user/requests
GET user/feeds - get the other profiles of the users.

Status - ignore, interested, accepted and rejected.
