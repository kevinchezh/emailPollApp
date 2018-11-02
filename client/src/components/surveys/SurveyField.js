//surveyFeild render 
import React from 'react';

export default (value) => {
    //{...input} means put all properties in input to this tag. So
    //we dont have to write it one by one
    return (
        <div>
            <label>{value.label}</label>
            <input {...value.input}  style = {{marginBottom:'5px'}}/>
            <div className = 'red-text' style={{marginBottom:'20px'}}>
                {value.meta.touched? value.meta.error : ""}
            </div>
            
            
        </div>
    )
}