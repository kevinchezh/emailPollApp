//show surveyForm and surveyFormReview
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = {new:true};
    // }
    //save as above
    state = { showReview : false};
    renderContent(){
        if(this.state.showReview){
            //if hit cancel button
            return <SurveyFormReview onCancel={()=> this.setState({showReview:false})} />
        }
        //when we submit ture showReview to be true
        return <SurveyForm onSurveySubmit={
            () => this.setState({showReview:true})
        }/>
    }
    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
            
        )
    }
}

//we want to make that if hit next button and back we keep the value in 
//form, but hit cancel, we clear it
export default reduxForm({
    form:'surveyForm'
    //by default value would be clear if unmounted, so here we declear
    //we want the default behavior rather than keep value behavior
    //in sureyform.js
})(SurveyNew);