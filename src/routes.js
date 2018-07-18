import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CategoryList from './views/Category/CategoryList';
// import AdminHome from './views/AdminHome/AdminHome';
import PollFeed from './views/PollFeed/PolFeed';
import AddPollForm from './views/PollFeed/AddPollForm'
import EditPollForm from './views/PollFeed/EditPollForm';

const Routes = () => (

        <Switch>    
            <Route exact path='/' component={PollFeed}/>
            <Route exact path='/polls' component={PollFeed}/>
            <Route exact path='/polls/add' component={AddPollForm}/>
            <Route exact path='/polls/edit' component={EditPollForm}/>
            <Route exact path='/categories' component={CategoryList}/>
            
        </Switch>
)

export default Routes;