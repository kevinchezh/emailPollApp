
const keys = require('../config/keys').stripeSecretKey;
const stripe = require('stripe')(keys);
const requireLogin = require('../middlewares/requireLogin');
module.exports = (app) =>{
    //use the login middlewares in this route
    app.post('/api/stripe', requireLogin, async (req,res)=>{
        
        //take the token and make a charge
        //thanks to body-parser
        // console.log(req.body);

        //create an actual charge
        //this is the formal request to charge, the react-stripe api does
        //not make the request, it just varify the card and send back
        //a token
        const charge = await stripe.charges.create({
            amount:500,
            currency:'usd',
            description:'$5 for 5 credits',
            source:req.body.id
        })
        
        req.user.credit += 5;
        const user = await req.user.save();

        res.send(user);
    })
}