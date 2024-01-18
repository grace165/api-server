const express = require('express')
const app = express()

//set port to the PORT env var (if it is defined)
//otherwise set it to 3000
const port = process.env.PORT || 3000

//set up default route ('') and return 'Hello World!' in the response 
//when requests are received
app.get('', (req, res) => {
    res.send('Hello World! BOING!')
})

//configure the server to listen for connections on the port
//print to console when ready for connections
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})