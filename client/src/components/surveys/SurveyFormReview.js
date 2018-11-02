import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
//pass the router information to this component
import {withRouter} from 'react-router-dom';
//formValues are in our state because of mapStateToProps function
const SurveyReview = ({onCancel, formValues, submitSurvey,history}) => {
    return (
        <div>
            <h5>Confirm Page</h5>
            <div>
                <label>Survey Title</label>
                <div>{formValues.title}</div>
            </div>
            <div>
                <label>Subject Line</label>
                <div>{formValues.subject}</div>
            </div>
            <div>
                <label>Email Body</label>
                <div>{formValues.body}</div>
            </div>
            <div>
                <label>Recipient List</label>
                <div>{formValues.recipients}</div>
            </div>
            <button className = 'yellow darken-3 white-text btn-flat' onClick = {onCancel}>
            Back
            </button>
            <button  onClick = {() => submitSurvey(formValues,history)} className = 'green white-text btn-flat right'>
            Send Survey
            <i className = 'material-icons right'>email</i>
            </button>
        </div>
        
        
    )
}
//put data in state to local state.props
function mapStateToProps(state){
    
    return {
        formValues: state.form.surveyForm.values
    }
}

//save router info into history object
export default connect(mapStateToProps,actions)(withRouter(SurveyReview));