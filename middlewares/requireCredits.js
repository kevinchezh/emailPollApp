module.exports = (req, res, next)=> {
    //next is what we do after finish this middleware, pass this result
    //and sent request to next middleware in store

    if(req.user.credit < 1){
        return res.status(401).send({error:"You do not have enough credit!"});

    }
    next();
}