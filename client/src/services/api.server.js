import axios from 'axios';
const commonConfig = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    // headers: {
    //     'Content-Type': 'multipart/form-data',
    // },
};
export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};