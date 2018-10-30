const passport = require('passport');
//export as a function with the variable app
module.exports = (app)=>{
    app.get('/auth/google',passport.authenticate(
        'google',{
            //we just want the profile and email within google user data scope
            scope:['profile','email']
            }
        )
    );
    //go to callback route, make authentication, then redirect to dashboard
    app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req,res)=>{
        res.redirect('/surveys');
    });
    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    });
    app.get('/api/logout', (req,res)=>{
        //pass in passport object have this method
        req.logout();
        res.redirect('/')
    });
    
}
