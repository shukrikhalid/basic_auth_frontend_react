import axios from 'axios';
import authHeader from './auth-header';
import config from '../config';

const API_URL = `${config.API_URL}/user`;

class UserService {
  getUsers(search) {
    const params = (search !== undefined)? `?search=${search}` : ""
    return axios.get(API_URL + params , { headers: authHeader() });
  }
}

export default new UserService();