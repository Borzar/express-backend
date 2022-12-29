const express = require('express');
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = '/api/users';

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

  routes() {
    this.app.use(this.path , require('../routes/user'))
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }
}

module.exports = Server;
