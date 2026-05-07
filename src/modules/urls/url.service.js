import {UrlRepository} from "./url.repository.js";
import { nanoid } from 'nanoid';

export class UrlService {
    constructor(){
        this.urlRepository = new UrlRepository();
    }

    async create(url){
        const shortCode = nanoid() 
        const urlData = {
            originalUrl: url,
            shortCode,
        }
        return await this.urlRepository.create(urlData);
    }
    async getLongUrl(shortCode){
        const urlData = await this.urlRepository.findByShortCode(shortCode);
        if(!urlData){
            throw new Error('Short URL not found');
        }
        return urlData.originalUrl;
    }

    async redirect(shortCode){
        const urlData = await this.urlRepository.findByShortCode(shortCode);
        if(!urlData){
            throw new Error('Short URL not found');
        }
        await this.urlRepository.incrementClickCount(shortCode);
        return urlData.originalUrl;
    }

    async findAll(){
        return await this.urlRepository.findAll();
    }
}