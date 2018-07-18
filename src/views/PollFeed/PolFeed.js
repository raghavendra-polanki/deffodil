import React, { Component } from 'react';
import './PollFeed.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ApiConfig from '../../config/api'
import GetData from '../../services/getdata';
import PollCard from '../../components/PollCard'
import { Button } from '@material-ui/core';
import {Redirect} from 'react-router-dom'

class PollFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      searchString: '',
      addPollClicked:false
    }
    this.getPolls()
  }

  getPolls = () => {
    GetData(ApiConfig.adminApi.url+'poll/list')
    .then((result) => {
        this.setState({polls: result.data})
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
    this.getPolls()
  }

  addButtonClicked = (event) => {
    this.setState({addPollClicked: true});
  }

  render() {

    if(this.state.addPollClicked){
      this.setState({addPollClicked: false});
      return (<Redirect to='/polls/add'/>)
    }

    return (
      <div className='poll-feed'>
          { this.state.polls ? (
            <div>
                <TextField style={{padding: 24}}
                    id="searchInput"
                    placeholder="Search for Polls"   
                    margin="normal"
                    onChange={this.onSearchInputChange}
                    />
                <Button variant="contained"
                 color="primary" 
                 onClick={this.addButtonClicked}
                  className={this.props.button}>
                     Add Poll
                 </Button>
                <Grid container spacing={24} style={{padding: 24}}>
                    { this.state.polls.map(currentPoll => (
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <PollCard poll={currentPoll} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        ) : "No courses found" }
      </div>
    )
  }
}

export default PollFeed;
