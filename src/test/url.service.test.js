
const { UrlService } = require("../../src/modules/urls/url.service.js");

describe('UrlService', () => {
    it('should create short URL', async () => {
      const mockRepo = {
        create: jest.fn(),
      }; 
  
      mockRepo.create.mockResolvedValue({
        shortCode: 'abc123',
      });
  
      const service = new UrlService(mockRepo);
  
      const result = await service.create('https://google.com');
  
      expect(result.shortCode).toBe('abc123');
    });
  });