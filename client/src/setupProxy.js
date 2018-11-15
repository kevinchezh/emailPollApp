const proxy = require('http-proxy-middleware');

module.exports = (app)=>{
    app.use(proxy('/auth/google',{target:"http://localhost:8080"}))
    app.use(proxy('/api/surveys/',{target:"http://localhost:8080"}))
    app.use(proxy('/api/*',{target:"http://localhost:8080"}))
};