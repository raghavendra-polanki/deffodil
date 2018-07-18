import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

class MenuItems extends React.Component {
  constructor(props){
    super(props);
    this.state={
      onButtonClick: this.props.onButtonClicked
    }
    this.CategoriesButtonClicked = this.CategoriesButtonClicked.bind(this);
    this.pollsButtonClicked = this.pollsButtonClicked.bind(this);
    this.usersButtonClicked = this.usersButtonClicked.bind(this);
  }

  CategoriesButtonClicked(){
    this.state.onButtonClick('categories');
  }

  pollsButtonClicked(){
    this.state.onButtonClick('polls');
  }

  usersButtonClicked(){
    this.state.onButtonClick('users');
  }

  render(){
  return(
    <div>
      <ListItem button onClick={this.pollsButtonClicked}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Polls" />
      </ListItem>
      <ListItem button onClick={this.CategoriesButtonClicked}>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Categorys" />
      </ListItem>
      <ListItem button  onClick={this.usersButtonClicked}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </div>
  );
}
};

export default MenuItems