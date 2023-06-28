import createApiClient from './api.server.js';

class MediaService {
    constructor(baseUrl = '/media') {
        this.api = createApiClient(baseUrl);
    }

    async popularMovies() {
        return (await this.api.get('/movies/popular')).data;
    }

    async popularSeries() {
        return (await this.api.get('/tv-series/popular')).data;
    }

    async create(formData, tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.post('/add', formData, header));
    }

    async getDetail(id) {
        return (await this.api.get(`/detail/${id}`)).data;
    }
}

export default new MediaService;
