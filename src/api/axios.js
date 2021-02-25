import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ''
  },
})
instance.interceptors.request.use((request) => {

  //request.headers['authorization'] = `Bearer ${ cookies.get('tokenn')}`
  return request;
}, (error) => {
  console.log(error)
  // Do something with request error
  return Promise.reject(error);
});



export default instance
