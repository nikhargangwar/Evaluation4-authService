const redis = require('redis');
exports.insertIntoRedis = async(token,username) => {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }
  });
  await client.connect()
  await client.set(username, token);
  const value = await client.get(username);
  await client.disconnect()
  
  return value;
}