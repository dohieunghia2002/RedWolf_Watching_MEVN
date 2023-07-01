import createApiClient from './api.server.js';

class FavoriteService {
    constructor(baseUrl = '/favorites') {
        this.api = createApiClient(baseUrl);
    }

    async favorites(tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.get('/user', header)).data;
    }
}

export default new FavoriteService;
