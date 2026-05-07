import { UrlService } from './url.service.js';
export class UrlController {
    constructor(){
        this.urlService = new UrlService();
    }
    createShortUrl = async(req, res) => {
        const { url } = req.body;
        const shortUrl = await this.urlService.create(url);
        res.json({
            success: true,
            message: 'Short URL created successfully',
            data: {
                shortUrl,
            },
        });
    }
    redirectToLongUrl = async(req, res) => {
        const { shortUrl } = req.params;
        const longUrl = await this.urlService.getLongUrl(shortUrl);
        res.json({
            success: true,
            message: 'Redirecting to long URL',
            data: {
                longUrl,
            },
        });
    }
    redirect = async(req, res) => {
        const { shortCode } = req.params;
        const originalUrl =  await this.urlService.redirect(shortCode);
        return res.redirect(302, originalUrl);
    }

}