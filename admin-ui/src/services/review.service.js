import createApiClient from './api.server.js';

class ReviewService {
    constructor(baseUrl = '/reviews') {
        this.api = createApiClient(baseUrl);
    }

    async reviews(tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.get('/user', header)).data;
    }
}

export default new ReviewService;
