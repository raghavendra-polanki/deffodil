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
import {Redirect} from 'react-router-dom'
import PostData from '../../services/postdata'
import PollForm from '../../components/PollForm';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.paddingTop*2,
    paddingBottom:theme.paddingTop*2,
  },
});


class AddPollForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      poll:{
        id:'',
        question:'',
        choices:[{
        title: '',
        media: [],
        votes: []
        },
        {
          title: '',
          media: [],
          votes: []
        }],
        description:'',
        reference:'',
        media:[],
        selectedCategories:[]
      },
      categories:[],
    }
  }

  render(){

    return (
      <div className='edit-poll'>
        <PollForm type='Add' poll={this.state.poll}/>
      </div>
    );
}
}

AddPollForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPollForm);