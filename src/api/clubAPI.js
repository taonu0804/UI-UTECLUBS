import axios from 'axios';

let API_URL = 'http://localhost:8080';
function callApi(endpoint, method = 'GET', body) {
       return axios({
           method,
           url: `${API_URL}/${endpoint}`,
           data: body
       }).catch(err => {
           console.log(err);
       });
}
export default callApi;