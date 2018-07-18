import axios from 'axios'
import ApiConfig from '../config/api'

export default function PostData(type, userData){
    let BaseURL = ApiConfig.adminApi.url;

    return axios({
        url: BaseURL+type,
        method: 'POST',
        headers: { 
            'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
         },
         transformRequest: [(data) => JSON.stringify(userData)],
      });
}