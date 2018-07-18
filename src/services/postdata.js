import axios from 'axios'

export default function PostData(type, userData){
    let BaseURL = "http://localhost:17883/api/";

    // return new Promise((resolve,reject) => {

    //     var stringData =  JSON.stringify(userData);
    //     console.log(stringData);
    //     fetch(BaseURL+type,{
    //         headers: {
    //             // 'Content-Type':'application/x-www-form-urlencoded'
    //             // 'Content-Type': 'application/json'
    //             // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    //             "Content-Type": "application/json",
    //             'Accept': 'application/json',
    //             'Access-Control-Allow-Origin':'*',
    //           },
    //         method: 'POST',
    //         body: stringData
    //     })
    //     .then((res) => {
    //         resolve(res.json());
    //     })
    //     .catch((error)=>{
    //         reject(error);
    //     })

    // })

    // return axios.post(BaseURL+type,userData,{
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //     }})
    //     .then((response)=> response.json());

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