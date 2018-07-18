import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItems  from './MenuItems';
import PollFeed from '../PollFeed/PolFeed'
import Theme from '../../styles/theme'
import {Redirect} from 'react-router-dom'
import Routes from '../../routes'

import { createBrowserHistory } from 'history';


export const history = createBrowserHistory();

class Home extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      open: false,
      anchor: 'left',
      hasToRedirect: false,
      redirectUrl:''
    };

    this.onMenuItemClicked = this.onMenuItemClicked.bind(this);
  }

  classes = {};
  theme={};

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  onMenuItemClicked(itemClicked){
    this.setState({redirectUrl: itemClicked, hasToRedirect: true});
    this.handleDrawerClose();
  }

  render() {

    if(this.state.hasToRedirect){
      this.setState({hasToRedirect: false});
      return (<Redirect to={this.state.redirectUrl}/>)
    }
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Opino Admin
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </div>
         <Divider />
        <List>
        <MenuItems onButtonClicked={this.onMenuItemClicked}/>
        </List>
      </Drawer>
      <div className={classes.mainRoute}>
        <Routes/>
      </div>
        </div>
      </div>
    );
  }
}

// NavBar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(Theme, { withTheme: true })(Home);
