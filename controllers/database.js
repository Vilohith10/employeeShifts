const ServerlessClient = require('serverless-postgres')

const client = new ServerlessClient({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  async function connectPg() {
    await client.connect();
    console.log("Database connection succesful");

}


async function execute_query_params_return_query_result(query, params) {
    // get connection from pool & execute query & release connections
    await client.connect();
    let results = [];
    try {
      const res = await client.query(query, params);
      results = res;
    } finally {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.clean()
    }
    return results;
  }

module.exports = {
    connectPg,
    execute_query_params_return_query_result
  }