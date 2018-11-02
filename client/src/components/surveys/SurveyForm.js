import React, {Component} from 'react';
import {reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    {label : 'Survey Title', name:'title'},
    {label : 'Subject Line', name:'subject'},
    {label : 'Email Body', name:'body'},
    {label : 'Recipient List', name:'recipients'}

]
class SurveyForm extends Component {
    
    
    renderField(){
        return _.map(FIELDS, (field) => {
            return (
            <Field key = {field.name} type='text' component={SurveyField} name={field.name} label = {field.label} />
            )
        })
    }
    render(){
        return (
            <div>
                <form onSubmit = {this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderField()}
                    <Link to='/surveys' className = 'red btn-flat white-text'>Cancel</Link>
                    <button className = 'teal btn-flat right white-text' type = 'submit'>Next
                    <i className = 'material-icons right'>done</i>
                    </button>
                </form>
                
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.title){
        errors.title = 'You must provide a title';
    }
    if(!values.subject){
        errors.subject = 'You must provide a subject';
    }
    if(!values.body){
        errors.body = 'You must provide a content of the email';
    }
    // _.each(FIELDS,(name) => {
    //     if(!values[name]){
    //         errors[name] = 'You should provide a value'
    //     }
    // })
    errors.recipients = validateEmails(values.recipients || "");

    //the errors would automattically pass into SurveyField in the meta tag
    return errors;
}

export default reduxForm({
    validate:validate,
    //the name in the state store
    form:'surveyForm',
    //does not delete original form value once you go to anther route and
    //then return to this
    destroyOnUnmount:false
})(SurveyForm);