const express = require('express') 
const mongoose = require('mongoose')
const auth = require('../middleware/auth') 
const Notification = require('../models/notification')
const User = require('../models/user')

const router = express.Router()

router.post('/notification', auth, async (req, res) => { 
    console.log(req.body) 

    const user = req.user

    try {
        const notification = new Notification({
            ...req.body,
            sender: user._id
        })

        await notification.save()

        const receiver = await User.findById(notification.receiver);
        receiver.notifications.push(notification._id);

        await receiver.save()

        res.status(201).send()
    }
    catch (error) {
        console.log(error)
        res.status(400).send()
    }
}) 

module.exports = router