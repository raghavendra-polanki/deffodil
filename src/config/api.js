function config(){
    
    let apiUrl;

    if(process.env.REACT_APP_NODE_ENV === 'production'){
        apiUrl = {

            'adminApi' : {
                'url'      : 'http://api.opino.me/api/'
            }
        }
    }else{
        apiUrl = {

            'adminApi' : {
                'url'      : 'http://localhost:17883/api/'
            }
        }

    }
    return apiUrl
}

export default config()