/**
 * @ignore
 */

export default class Cache {
  constructor() {
    this.cacheStore = {};
  }

  write(key, value, ttl = 0) {
    console.log(`Write cache: ${key}`);
    this.cacheStore[key] = {
      value: value,
      expiresIn: new Date().getTime() + ttl * 100,
    };
    return true;
  }

  read(key) {
    if (key in this.cacheStore) {
      const expiresIn = this.cacheStore[key].expiresIn;
      if (!expiresIn || new Date().getTime() <= expiresIn) {
        console.log(`HIT cache: ${key}`);
        return this.cacheStore[key].value;
      } else {
        console.log(`Expired cache: ${key}`);
      }
    }
    return null;
  }
}
