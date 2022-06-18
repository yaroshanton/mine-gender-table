import axios from 'axios';

axios.defaults.baseURL = 'https://gorest.co.in/public/v1/users';
const accessToken =
  '?access-token=5048b1ce6a0ff5adb5bad9da22344cefa0c5f04a5dc13cb055fa308e3935359c';

export function getUsers() {
  return axios
    .get(`/${accessToken}`)
    .then(res => res)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

export function getUser(id) {
  return axios
    .get(`/${id}${accessToken}`)
    .then(res => res)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

export function updateUser(id, data) {
  return axios
    .put(`/${id}${accessToken}`, data)
    .then(res => res)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
