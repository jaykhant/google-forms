import jwt from 'jsonwebtoken';
import config from '../config/index';

const payload = {
    "email": "test@94gmail.com",
    "id": "64e86af91a6ac5e9d5a36d85"
};
const userAccessToken = jwt.sign(
    { email: payload.email, id: payload.id },
    config.secretkey, { expiresIn: '2h' }
)

export default {
    userAccessToken
};