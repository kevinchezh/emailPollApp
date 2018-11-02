const mongoose = require('mongoose');

const _ = require('lodash');
const Path = require('path-parser').default;
//url is default in nodeJs
//have bunch helpers
const{URL} = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
//could also import Schema in old way
const Survey = mongoose.model('surveys');
module.exports = (app) => {
    app.get('/api/surveys',requireLogin,async (req,res) => {
        const surveys = await Survey.find({_user: req.user.id})
        .select({recipients:0});
        //exclude recipients property in the surveys

        res.send(surveys);
    })
    //
    app.get('/api/surveys/:surveyID/:choice',(req,res) => {
        res.send('Thanks for voting!');
    });
    app.post('/api/surveys/webhooks',(req,res) => {
        //the pattern, matcher
        const p = new Path('/api/surveys/:surveyID/:choice');
        //data cleaning
        //_.chain(array).function1().function2().value(), lodash chain syntax
        _.chain(req.body)
            .map((event) => {
                //only take the url
                const pathname = new URL(event.url).pathname;
                
                
                //return an object
                //if match the pattern, then object would have property name
                //in pattern, if not match, then the object return undefined
                const match = p.test(pathname);
                //so the match here could only be an object or undefined(null)
                if(match){
                    return {email:event.email, surveyID: match.surveyID, choice:match.choice};
                }
            })
            //remove undefined records
            .compact()
            //make sure no two records have same email and also same surveyID
            .uniqBy('email','surveyID')
            .each(({email, choice,surveyID}) => {
                //query
                Survey.updateOne({
                    _id: surveyID,
                    recipients:{
                        $elemMatch:{email:email, responded:false}
                    }
                },{
                    //[choice] would be converted to yes or no base on the value of choice
                    //$inc increase by 1
                    $inc:{[choice]:1},
                    $set:{'recipients.$.responded': true},
                    lastResponded: new Date()
                }).exec();
            })
            .value();
        // const events = _.map(req.body, (event) => {
        //     //only take the url
        //     const pathname = new URL(event.url).pathname;
            
            
        //     //return an object
        //     //if match the pattern, then object would have property name
        //     //in pattern, if not match, then the object return undefined
        //     const match = p.test(pathname);
        //     //so the match here could only be an object or undefined(null)
        //     if(match){
        //         return {email:event.email, surveyID: match.surveyID, choice:match.choice};
        //     }
        // });
        // //remove undefined records
        // const compactEvents = _.compact(events);
        // //make sure no two records have same email and also same surveyID
        // const uniqueEvents = _.uniqBy(compactEvents,'email','surveyID');
        
        res.send({});
    })
    //thank you page
    app.get('/api/surveys/thanks',(req,res) => {
        res.send("Thanks for voting!");
    });
    app.post('/api/surveys', requireLogin, requireCredit, async (req,res) => {
        // const title = req.body.title
        const {title, subject, body, recipients} = req.body;
        const survey = new Survey ({
            title: title,
            subject: subject,
            body:body,
            //split recipients into array, and then map each
            //element to an object contain an email property
            //trim is just to cut out extra white space before email
            recipients: recipients.split(',').map((email) =>({
                email:email.trim()
            })),
            _user: req.user.id,
            dataSent:Date.now()
        })

        //send email section

        //create the mailer
        const mailer = new Mailer(survey,surveyTemplate(survey));
        //error handling
        try{
            //send the request, function is in Mailer serveices
            await mailer.send();
            await survey.save();
            req.user.credit -=1;
            const user = await req.user.save();
            res.send(user);
        }
        catch(err){
            res.status(422).send(err);
        }
        
    });
}