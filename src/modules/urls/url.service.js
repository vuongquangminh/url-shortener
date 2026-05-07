import { redisClient } from "../../config/redis.js";
import { clickQueue } from "../../queues/click.queue.js";
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
    const cacheKey = `${this.#cacheKeyPrefix + shortCode}`;
    await redisClient.set(cacheKey, urlData.originalUrl, {
        EX: 60 * 60,
      });
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

  async redirect(shortCode, req) {
    const cacheKey = `${this.#cacheKeyPrefix + shortCode}`;
    const cachedUrl = await redisClient.get(cacheKey);
    if (cachedUrl) {
        await clickQueue.add("click-tracking", {
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
            referer: req.headers.referer,
            shortCode,
          });
      return cachedUrl;
    }
    const urlData = await this.urlRepository.findByShortCode(shortCode);
    if (!urlData) {
      const error = new Error("Short URL not found");
      error.statusCode = 404;
      throw error;
    }
    await clickQueue.add("click-tracking", {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        referer: req.headers.referer,
        shortCode,
      });
    
    return urlData.originalUrl;
  }
}
