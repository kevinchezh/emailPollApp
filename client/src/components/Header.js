import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';
class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            //null condition, request not finished yet
            case null:
                return;
            //no user logged in
            case false:
                return (
                    <li><a href='/auth/google'>Login With Google</a></li>
                )
            //there is a user
            default:
                return [
                    <li key='1'><Payments /></li>,
                    <li key = '2' style = {{margin:'0 10px'}}>Credits: {this.props.auth.credit}</li>,
                    <li key='3'><a href='/api/logout'>LogOut</a></li>
                    
                ]
        }
    }
    render(){
        console.log(this.props)
        //logo there, if log in then go to dashboard
        //if not log in then go to landing page
        return (
            
            <nav>
                <div className="nav-wrapper">
                <Link 
                to = {this.props.auth ? '/surveys' : '/'} 
                className="left-brand-logo">
                
                Email Poll</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {this.renderContent()}
                    
                </ul>
                </div>
            </nav>
        )
    }
}
function mapStateToProps(state){
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Header);