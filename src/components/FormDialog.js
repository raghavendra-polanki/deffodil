import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      // open: this.props.open,
      categoryString:''
    };
  }

  handleSubmit = () => {
    // this.setState({ open: true });
    this.props.handleSubmit(this.state.categoryString);
  };

  handleCancel = () => {
    // this.setState({ open: false });
    this.props.handleCancel(this.state.categoryString);
  };

  onTextChanged = (event) => {

    if (event.target.value) {
        this.setState({categoryString: event.target.value});
    } else {
        this.setState({categoryString: ''});
    }
  }
  render() {

    return (
      <div>
        <Dialog
          open={this.props.isFormOpen}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name of Category
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category"
              fullWidth
              onChange={this.onTextChanged}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
