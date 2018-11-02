const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//helper.Mail is already a class, we want to inheret that and add some
//feature to it
class Mailer extends helper.Mail {
    constructor({subject, recipients},content){
        super();


        this.sgAPI = sendgrid(keys.sendgridKey);
        //this is what we should do according to sendgrid API
        this.from_email = new helper.Email('no-reply@emailPoll.com');
        this.subject = subject;
        this.body = new helper.Content('text/html',content);
        this.recipients = this.formatAddresses(recipients);
        //a build-in function, actually set this body to it
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients){
        return recipients.map(({email}) => {
            return new helper.Email(email);
        })
    }

    addClickTracking(){
        //how the api want... No idea why
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){
        //api thing
        const personallize = new helper.Personalization();
        //iterate every object in recipients and add to personalize object
        this.recipients.forEach(recipient => {
            personallize.addTo(recipient);
        });
        this.addPersonalization(personallize);
    }

    async send(){
        //create the request
        //again api thing
        const request = this.sgAPI.emptyRequest({
            method:'POST',
            path:'/v3/mail/send',
            body:this.toJSON()
        })
        //send the request. API config
        const response = await this.sgAPI.API(request);
        return response;
    }
}

module.exports = Mailer;