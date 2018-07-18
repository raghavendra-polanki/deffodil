import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input'
import ApiConfig from '../config/api'
import GetData from '../services/getdata';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Button } from '@material-ui/core';
import {Redirect} from 'react-router-dom'
import PostData from '../services/postdata'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.paddingTop*2,
    paddingBottom:theme.paddingTop*2,
  },
});


class PollForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      categories:[],
      id:this.props.poll.id,
      question:this.props.poll.question,
      choices:this.props.poll.choices,
      description:this.props.poll.description,
      reference:this.props.poll.reference,
      media:this.props.poll.media,
      selectedCategories:this.props.poll.selectedCategories,
      redirectOnSubmit:false
    }
    this.getCategories();
    this.postPoll = this.postPoll.bind(this);
    this.submitClicked = this.submitClicked.bind(this);
  }

  getCategories() {
    GetData(ApiConfig.adminApi.url+'category/list')
    .then((result) => {
        this.setState({categories: result.data})
        // console.log(this.state.polls)
        return result.data;
    })
    .catch((error) => {
      console.log("Error occurred while fetching Entries")
      console.error(error)
    })
  }

  postPoll = () => {

    var pollData = {
        id: this.state.id,
        is_active: true,
        question : this.state.question,
        desc: this.state.description,
        ref: this.state.reference,
        media: this.state.media,
        categories: this.state.selectedCategories,
        choices: this.state.choices,
        has_end: false
    };
    let type;
    if(this.props.type === 'Add'? type='insert' : type='update' )
    PostData('poll/' + type, pollData).then((result) =>{

        let responseJson = result.data.data;
        if(responseJson){
            this.setState({'redirectOnSubmit':true});
        }
        })
        .catch((error)=>{
            console.log(error);
        });
}
  
  handleAddChip(chip){
    console.log(chip);
  }
  
  handleDeleteChip(chip,index){
    console.log(chip);
  }

  submitClicked(){
    this.postPoll();

  }

  onQuestionChange = (event) => {
    if (event.target.value) {
        this.setState({question: event.target.value})
    } else {
        this.setState({question: ''})
    }
  }

  onChoice1Change = (event) => {
    let choices = [...this.state.choices];
    
    if (event.target.value) {
        choices[0].title = event.target.value;
        this.setState({choices: choices});
    } else {
      choices[0].title = '';
      this.setState({choices: choices});
    }
  }

  onChoice2Change = (event) => {
    let choices = [...this.state.choices];
    
    if (event.target.value) {
        choices[1].title = event.target.value;
        this.setState({choices: choices});
    } else {
      choices[1].title = '';
      this.setState({choices: choices});
    }
  }

  onDescriptionChange = (event) => {
    if (event.target.value) {
        this.setState({description: event.target.value})
    } else {
        this.setState({description: ''})
    }
  }

  onReferenceChange = (event) => {
    if (event.target.value) {
        this.setState({reference: event.target.value})
    } else {
        this.setState({reference: ''})
    }
  }

  onMediaChange = (event) => {
    if (event.target.value) {
        this.setState({media: [event.target.value]})
    } else {
        this.setState({media: ['']})
    }
  }

  render(){

  if(this.state.redirectOnSubmit){
    this.setState({redirectOnSubmit: false});
    return (<Redirect to='/polls/'/>)
  }
  const { classes } = this.props;
  var categories = [];
  for(var i = 0; i < this.state.categories.length; i++){
    categories[i] = this.state.categories[i].name;
  }
  return (
    <div className='add-poll'>
      <Paper className={classes.root} elevation={1}>
        <Typography 
            variant="headline" align='center' component="h3">
          {this.props.type + ' Poll'}
        </Typography>
        <TextField
                    id="question"
                    label="Question"
                    placeholder="Enter your question"   
                    margin="normal"
                    fullWidth
                    onChange={this.onQuestionChange}
                    value={this.state.question}
        />
        <Paper className='choices' elevation={2}>
        <Typography 
            variant="title" align='center' component="h5">
         Choices
        </Typography>
        <TextField
                  style={{ marginLeft: 24, marginRight: 24, width: 200,}}
                    id="choice-1"
                    label="Choice 1"
                    placeholder="Enter your choice"   
                    margin="normal"
                    onChange={this.onChoice1Change}
                    value={this.state.choices[0].title}
        />
        <TextField
                  style={{ marginLeft: 24, marginRight: 24, width: 200,}}
                    id="choice-2"
                    label="Choice 2"
                    placeholder="Enter your choice"   
                    margin="normal"
                    onChange={this.onChoice2Change}
                    value={this.state.choices[1].title}
        />
        </Paper>
        <TextField
                    id="desc"
                    label="Description"
                    placeholder="Enter Description"   
                    margin="normal"
                    fullWidth
                    onChange={this.onDescriptionChange}
                    value={this.state.description}
        />
        <TextField
                    id="ref"
                    label="Reference"
                    placeholder="Enter reference URL"   
                    margin="normal"
                    fullWidth
                    onChange={this.onReferenceChange}
                    value={this.state.reference}
        />
        <TextField
                    id="media"
                    label="Images"
                    placeholder="Provide image URL"   
                    margin="normal"
                    fullWidth
                    onChange={this.onMediaChange}
                    value={this.state.media}
        />
       <MuiThemeProvider>
       <ChipInput
        dataSource={categories}
        onNewRequest={(chosenRequest, index) => this.handleDeleteChip(chosenRequest, index)}
        onRequestDelete={this.handleDeleteChip}
        openOnFocus={true}
        hintText='Choose Categories'
        floatingLabelText='Category'
        fullWidth
       />
      </MuiThemeProvider>
      <div align= 'center'>
      <Button 
          style={{ marginTop: 24, marginBottom: 24}}
          variant="contained"
          color="primary" 
          onClick={this.submitClicked}
          className={this.props.button}>
          Save
       </Button>
       </div>
      </Paper>
    </div>
  );
}
}

PollForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PollForm);