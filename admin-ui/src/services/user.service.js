import createApiClient from './api.server.js';

class UserService {
    constructor(baseUrl = '/users') {
        this.api = createApiClient(baseUrl);
    }

    async login(formData) {
        return await this.api.post('/auth/login', {
            username: formData.username,
            password: formData.password
        });
    }

    async list(tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.get('/stored', header)).data;
    }
}

export default new UserService;
