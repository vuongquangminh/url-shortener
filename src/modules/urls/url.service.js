import { redisClient } from "../../config/redis.js";
import { UrlRepository } from "./url.repository.js";
import { nanoid } from "nanoid";

export class UrlService {
  #cacheKeyPrefix = "shortUrl:";
  constructor() {
    this.urlRepository = new UrlRepository();
  }
  async create(url) {
    const shortCode = nanoid();
    const urlData = {
      originalUrl: url,
      shortCode,
    };
    return await this.urlRepository.create(urlData);
  }
  async getLongUrl(shortCode) {
    const cacheKey = `${this.#cacheKeyPrefix + shortCode}`;
    const cachedUrl = await redisClient.get(cacheKey);
    if (cachedUrl) {
      return cachedUrl;
    }
    const urlData = await this.urlRepository.findByShortCode(shortCode);
    if (!urlData) {
      const error = new Error("Short URL not found");
      error.statusCode = 404;
      throw error;
    }
    await redisClient.set(cacheKey, urlData.originalUrl, {
      EX: 60 * 60,
    });
    return urlData.originalUrl;
  }

  async redirect(shortCode) {
    const cacheKey = `${this.#cacheKeyPrefix + shortCode}`;
    const cachedUrl = await redisClient.get(cacheKey);
    if (cachedUrl) {
      await this.urlRepository.incrementClickCount(shortCode);
      return cachedUrl;
    }
    const urlData = await this.urlRepository.findByShortCode(shortCode);
    if (!urlData) {
      const error = new Error("Short URL not found");
      error.statusCode = 404;
      throw error;
    }
    await this.urlRepository.incrementClickCount(shortCode);
    return urlData.originalUrl;
  }
}
