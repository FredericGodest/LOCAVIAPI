# LOCAVI API

## Installation
```node
npm install
```
## Setup
You have to create an additional file which called "db.config.js", with the following entries.
```node
process.env.USERNAME="XXXXX",
process.env.PASSWORD="XXXXXXXXXXXX",
process.env.HOST= "xxxxxxxxx.xxxxx.mongodb.net",
process.env.DB= "XXXXXXXX"
process.env.SESS_SECRET="XXXXXXXXXXXXXXXXX"
```
## Usage

To run the API on localhost, simply execute :
```node
nodemon index
```
