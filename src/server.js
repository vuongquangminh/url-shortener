const app = require('./app');
const env = require('./config/env');
app.listen(env.port, () => {
  console.log(env.databaseUrl);
  console.log(`Server is running on port ${env.port}`);
});