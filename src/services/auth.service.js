import axios from "axios";

import config from '../config';

const API_URL = `${config.API_URL}/auth`;

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/login", {},{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(username+":"+password)}`
        }
      }
      )
      .then(response => {
        if (response.data.result.accessToken) {
          const item = {
            value: response.data.result,
            expiry: (new Date()).getTime() + 3600000,
          }
          localStorage.setItem("user", JSON.stringify(item));
        }
        return response.data.result;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password, first_name, last_name) {
    return axios.post(API_URL + "/signup", {
      email,
      password,
      first_name,
      last_name
    });
  }

  getCurrentUser() {
    // return JSON.parse(localStorage.getItem('user'))
    const itemStr = localStorage.getItem('user')
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem('user')
      return null
    }
    return item.value
  }
}

export default new AuthService();