import React from 'react'
import TextField from '@material-ui/core/TextField';
import ApiConfig from '../../config/api'
import GetData from '../../services/getdata';
import CategoryChip from '../../components/CategoryChip'
import './Category.css'
import { Button } from '@material-ui/core';
import {Redirect} from 'react-router-dom'
import FormDialog from '../../components/FormDialog';
import PostData from '../../services/postdata'
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

class CategoryList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            searchString: '',
            isAddButtonClicked: false
          }
        this.getCategories();

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormCancel = this.handleFormSubmit.bind(this);
    }

    getCategories = () => {
        GetData(ApiConfig.adminApi.url+'category/list')
        .then((result) => {
            this.setState({categories: result.data})
            console.log(this.state.polls)
        })
        .catch((error) => {
          console.log("Error occurred while fetching Entries")
          console.error(error)
        })
      }

    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getCategories()
    }

    postCategory = (catString) => {
        PostData('category/insert', {name: catString}).then((result) =>{

            let responseJson = result.data.data;
            if(responseJson){
                // sessionStorage.setItem('userData',JSON.stringify(responseJson));
                // this.setState({'redirectToReferrer':true});
                this.setState({
                    categories: [...this.state.categories, responseJson]
                    })
            }
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    handleFormSubmit = (catString) => {
        this.postCategory(catString);
        this.setState({isAddButtonClicked: false});
    };
    
    handleFormCancel = () => {
        this.setState({isAddButtonClicked: false});
    };
    addButtonClicked = (event) => {
        this.setState({isAddButtonClicked: true});
    }

    render(){

        return (

            <div className='category-list'>
                <TextField style={{padding: 24}}
                    id="catSearchInput"
                    placeholder="Search for Categories"   
                    margin="normal"
                    onChange={this.onSearchInputChange}
                    />
                 <Button variant="contained" color="primary" onClick={this.addButtonClicked} className={this.props.button}>
                     Add Category
                 </Button>
                 <FormDialog isFormOpen={this.state.isAddButtonClicked}
                 handleSubmit={this.handleFormSubmit}
                 handleCancel={this.handleFormCancel}/>

                <div className='category-chips'>
                    {this.state.categories.map(currentCategory => (
                            <CategoryChip label={currentCategory.name} />

                    ))}
                </div>
  
            </div>
        )
    }
}

export default CategoryList