import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.themoviedb.org',
    params: {
        api_key: '6f26fd536dd6192ec8a57e94141f8b20',
    },
});
