

export default function GetCategories(searchText){

    GetData(ApiConfig.adminApi.url+'category/list')
    .then((result) => {
        this.setState({polls: result.data})
        console.log(this.state.polls)
    })
    .catch((error) => {
        console.log("Error occurred while fetching Entries")
        console.error(error)
    })

}