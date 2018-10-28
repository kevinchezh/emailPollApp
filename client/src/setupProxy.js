const proxy = require('http-proxy-middleware');

module.exports = (app)=>{
    app.use(proxy('/auth/google',{target:"hettp://localhost:8080"}))
};