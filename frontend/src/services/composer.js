const express = require('express')
const app = express()
const routes = require (',/src/routes')
const {init} = require(',/src/service-locator/composer')
const port = 3000

init ()
Router(app)

app.listen(port, () => {
    console .log ('Example app listening on port $ {port}')
    
})

