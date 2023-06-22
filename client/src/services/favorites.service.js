import createApiClient from './api.server.js';

class FavoritesService {
    constructor(baseUrl = '/favorites') {
        this.api = createApiClient(baseUrl);
    }

    async push(datas, tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.post('/add', datas, header));
    }

    async remove(id, tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.delete(`/${id}`, header)).data;
    }

    async details(datas, tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.post('/detail-medias', datas, header)).data;
    }

    async getList(tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.get('/', header)).data;
    }
}

export default new FavoritesService;
