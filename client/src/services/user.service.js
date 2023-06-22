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

    async register(formData) {
        return await this.api.post('/auth/register', formData);
    }

    async update(updateForm, tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.put('/add-info', updateForm, header));
    }

    async profile(tokenVal) {
        const header = {
            headers: { 'authorization': `Bearer ${tokenVal}` }
        }
        return (await this.api.get('/info', header)).data;
    }
}


export default new UserService;
