const express = require('express');
const path = require('path');
const app = express();


module.exports = (app)=> {
    app.get('/', (request, response)=>{
        response.sendFile(path.join(__dirname, `../public/index.html`))
    })

    app.post('/api/parse', (request, response)=>{
        console.log(request.body)
        response.redirect('/')
    })
}
