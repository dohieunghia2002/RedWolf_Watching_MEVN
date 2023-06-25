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
}

export default new MediaService;
