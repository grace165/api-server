const express = require('express') 
const router = express.Router()
const auth = require('../middleware/auth') 

router.post('/notification', (req, res) => { 
    console.log(req.body) 
    res.status(201).send(req.body) 
}) 

module.exports = router