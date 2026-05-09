import { validateData } from "../../utils/validateData.js";
import { createUrlSchema } from "./url.validator.js";

export class UrlController {
  constructor(urlService) {
    this.urlService = urlService;
  }
  createShortUrl = async (req, res, next) => {
    try {
      const body = validateData(createUrlSchema, req.body);
      const userId = req.user ? req.user.id : null;
      const shortUrl = await this.urlService.create(body.url, userId);
      return res.status(201).json({
        success: true,
        message: "Short URL created successfully",
        data: {
          shortUrl,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  redirectToLongUrl = async (req, res) => {
    const { shortUrl } = req.params;
    const userId = req.user ? req.user.id : null;
    const longUrl = await this.urlService.getLongUrl(shortUrl, userId);
    res.json({
      success: true,
      message: "Redirecting to long URL",
      data: {
        longUrl,
      },
    });
  };
  redirect = async (req, res) => {
    const { shortCode } = req.params;
    const originalUrl = await this.urlService.redirect(shortCode, req);
    return res.redirect(302, originalUrl);
  };
}
