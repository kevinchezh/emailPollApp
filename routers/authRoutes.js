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
    app.get('/auth/google/callback',passport.authenticate('google'));
    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    });
    app.get('/api/logout', (req,res)=>{
        //pass in passport object have this method
        req.logout();
        res.send(req.user);
    })
}
