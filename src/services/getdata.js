export default function GetData(URL){

    return new Promise((resolve,reject) => {
        fetch(URL)
        .then((response)=> response.json())
        .then((res) => {
            resolve(res);
        })
        .catch((error)=>{
            reject(error);
        })

    })
}