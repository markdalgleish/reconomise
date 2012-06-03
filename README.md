reconomise
==========

Crowd sourced local business support network and priority ranking system.

Reconomise aims to help recover local economies hit by disaster by encouraging small businesses to pool their resources.

Getting Started
---------------

Install [Node.js](http://nodejs.org/).

Install [MongoDB](http://www.mongodb.org/).

Start the MongoDB server: `mongod`

Install all the dependencies: `npm install`

Update the server config:
- Copy `server-config-example.js` and rename it to `server-config.js`
- Replace the Sensis placeholder API key with your own API key. Ask me if you don't have one :)
- Modify the MongoDB connection string if the default is incorrect.

Run the server: `node server.js`

Reconomise should now be available at [http://localhost:3000](http://localhost:3000)