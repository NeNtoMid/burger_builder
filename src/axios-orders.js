import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-7c1cc.firebaseio.com',
});

// instance.defaults.headers.common['Authorization'] = 'AUTH FUCKING TOKEN XD';

// instance.interceptors.request.use(
//   (req) => {
//     console.log(req);

//     return req;
//   },
//   (err) => {
//     console.log(err);

//     return Promise.reject(err);
//   }
// );

// instance.interceptors.response.use(
//   (res) => {
//     console.log(res);
//     return res;
//   },
//   (err) => {
//     console.log(err);

//     return Promise.reject(err);
//   }
// );
export default instance;
