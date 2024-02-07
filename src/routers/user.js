const express = require('express')
const User = require('../models/user')
const { sendVerificationEmail } = require('../emails/account.js')
const auth = require('../middleware/auth')

const router = new express.Router()

// Add a new user
router.post('/user', async (req, res) => {
  const user = new User(req.body)
  delete req.body.email_verified
  delete req.body.tokens

  try {
    await user.save()
    const token = await user.generateAuthToken()

    sendWelcomeEmail(user.email, user.username, token)
    res.status(201).send(user)
  }
  catch (error) {
    res.status(400).send(error)
  }

  /* try {
     await user.save()
     sendVerificationEmail(user.email, user.username)
     res.status(201).send(user)
   }
   catch (error) {
     res.status(400).send(error)
   }
 
   try {
     await user.save()
     const token = await user.generateAuthToken()
 
     sendWelcomeEmail(user.email, user.username, token)
     res.status(201).send(user)
   }
   catch(error){
     res.status(400).send(error)
   }
 */
})

//verify email
router.get('/user/verification', auth, async (req, res) => {
  const user = req.user
  const token = req.token

  console.log(user)
  console.log(token)

  user.email_verified = true
  user.save()
  
  res.send()
})

module.exports = router