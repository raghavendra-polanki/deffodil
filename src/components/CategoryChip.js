import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
});

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

class CategoryChip extends React.Component{
    constructor(props){
        super(props);
        this.state={
            label:this.props.label,
            avatar:'AT'

        }
    };
    render(){  
        const { classes } = this.props;
        return (
            <Chip
                avatar={<Avatar>{this.state.avatar}</Avatar>}
                label={this.state.label}
                onClick={handleClick}
                className={classes.chip}
            />
        )
    };
}


export default withStyles(styles)(CategoryChip);
