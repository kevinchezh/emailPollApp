//function component start with a lowercase letter
//class base component start with uppercase letter

import React, {Component} from 'react';
//BrowserRouter is brain of router, tell how Route how to behave, to show diff
//component on diff conditions
import  {Route,BrowserRouter, Switch} from 'react-router-dom';
import Header from './Header';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing'
const Dashboard = ()=> <h2>Dashboard</h2>
const SurveyNew = ()=> <h2>SurveyNew</h2>

class App extends Component {
    //browerser router only allow one child which means all things
    //should be in one child tag which is usually a <div> tag


    //if dont want to use switch, you could add a property in Route tag
    //which is exact = {true} or exact in it, it tells this route
    //only awakes when route is exact match this one

    //here the header is always gonna show on every page but contents 
    //could be diff in each route
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return (
            <div className = 'container'>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route path = '/surveys/new' component = {SurveyNew} />
                            <Route path = '/surveys' component = {Dashboard} />
                            <Route path = '/' component = {Landing} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
    
};

export default connect(null,actions)(App);