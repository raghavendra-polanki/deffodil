import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input'
import ApiConfig from '../../config/api'
import GetData from '../../services/getdata';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Button } from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import PostData from '../../services/postdata';
import PollForm from '../../components/PollForm';
import queryString from 'query-string';

class EditPollForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      poll:{
        id:'',
        question:'',
        choices:['',''],
        description:'',
        reference:'',
        media:[],
        selectedCategories:[]
      },
      categories:[],
      redirectOnSubmit:false,
      isPollFetched: false
    }
    let params = queryString.parse(this.props.location.search)
    this.getPoll = this.getPoll.bind(this);
    this.getPoll(params.id)
    this.setState({id: params.id})

  }

  getPoll(id) {
    GetData(ApiConfig.adminApi.url + 'poll/get?id=' + id)
    .then((result) => {
      let poll = {
        id: result.data.id,
        question: result.data.question,
        description: result.data.desc,
        choices: result.data.choices,
        reference: result.data.ref,
        media: result.data.media,
        selectedCategories: result.data.categories,
      }
        this.setState({poll: poll});
        this.setState({isPollFetched: true});

        // console.log(this.state.polls)
        return result.data;
    })
    .catch((error) => {
      console.log("Error occurred while fetching Entries")
      console.error(error)
    })
  }

  render(){

    if(this.state.isPollFetched){
      return (
        <div className='edit-poll'>
          <PollForm type='Edit' poll={this.state.poll}/>
        </div>
      );
    }

      return(
        <div style={{padding: 64}}>
          <h3>Fetching your poll...</h3>
        </div>
      );
}
}

export default EditPollForm;