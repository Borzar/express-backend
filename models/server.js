const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = '/api/users';

    // Connect DB
    this.connectionDB()

    // Middlewares
    this.middlewares()

    this.routes();
  }

  middlewares() {
    this.app.use(cors())

    // Read bady
    this.app.use( express.json() )

    // Public directory 
    this.app.use( express.static('public'))
  }

  async connectionDB() {
    await dbConnection()
  }

  routes() {
    this.app.use(this.path , require('../routes/user.routes'))
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }
}

module.exports = Server;
