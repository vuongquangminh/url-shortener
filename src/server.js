const app = require('./app');
const env = require('./config/env');
const { connectRedis } = require('./config/redis');

async function checkRedis() { 
  try {
    await connectRedis();
    console.log('Connected to Redis successfully');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
}
checkRedis();

app.listen(env.port, () => {
  console.log(env.databaseUrl);
  console.log(`Server is running on port ${env.port}`);
});