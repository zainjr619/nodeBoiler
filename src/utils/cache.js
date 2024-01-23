// // Redis Utils
// const cacheClient = require('async-redis');
// const config = require('../common/config');
// const logger = require('../common/logger');

// const { redis } = config;

// const client = cacheClient.createClient({
//   host: redis.host,
//   port: redis.port,
// });

// client.on('error', (err) => {
//   logger.error(`cache error : ${err}`);
// });

// client.on('ready', () => {
//   logger.info('cache is ready');
// });

// class RedisCache {
//   static set(moduleName, key, value) {
//     try {
//       if (typeof value !== 'string') {
//         client.set(moduleName + key, JSON.stringify(value));
//       } else {
//         client.set(moduleName + key, value);
//       }
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   static setWithExpiry(moduleName, key, value, seconds) {
//     try {
//       if (typeof value !== 'string') {
//         client.set(moduleName + key, JSON.stringify(value), 'EX', seconds);
//       } else {
//         client.set(moduleName + key, value, 'EX', seconds);
//       }
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   static setWithOriginalExpiry(moduleName, key, value) {
//     try {
//       if (typeof value !== 'string') {
//         client.set(moduleName + key, JSON.stringify(value), 'KEEPTTL');
//       } else {
//         client.set(moduleName + key, value, 'KEEPTTL');
//       }
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   static async get(moduleName, key) {
//     try {
//       return await client.get(moduleName + key);
//     } catch (error) {
//       return false;
//     }
//   }

//   static async del(moduleName, key) {
//     try {
//       return JSON.parse(await client.del(moduleName + key));
//     } catch (error) {
//       return false;
//     }
//   }

//   static async insertList(moduleName, key, list) {
//     try {
//       await client.rpush(`${moduleName}${key}`, list);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   static async getList(moduleName, key) {
//     try {
//       return await client.lrange(moduleName + key, 0, -1);
//     } catch (error) {
//       return false;
//     }
//   }

//   static async flushAll() {
//     try {
//       return JSON.parse(await client.flushdb());
//     } catch (error) {
//       return false;
//     }
//   }

//   static async lPush(moduleName, key, value) {
//     try {
//       return await client.lpush(moduleName + key, value);
//     } catch (error) {
//       return false;
//     }
//   }

//   static async lRem(moduleName, key, value) {
//     try {
//       return await client.lrem(moduleName + key, -1, value);
//     } catch (error) {
//       return false;
//     }
//   }
// }
// module.exports = RedisCache;
