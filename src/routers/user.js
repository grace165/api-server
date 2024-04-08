const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const { sendVerificationEmail } = require('../emails/account.js')
const auth = require('../middleware/auth')
const StudyGroup = require('../models/studygroup')

const router = new express.Router()

// Add a new user
router.post('/user', async (req, res) => {
  const user = new User(req.body)
  delete req.body.email_verified
  delete req.body.tokens

  console.log('body')
  console.log(user.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()

    sendVerificationEmail(user.email, user.username, token)
    res.status(201).send(user)
  }
  catch (error) {
    res.status(400).send(error)
  }
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

//login
router.post('/user/login', async (req, res) => {
  try {
    console.log(req.body.email)
    console.log(req.body.password)

    const user = await User.findByCredentials(req.body.email, req.body.password)
    console.log(user)

    if (user.email_verified === true) {
      const token = await user.generateAuthToken()
      res.status(200).send({ user, token })
    }
    else {
      res.status(401).send("Email has not been verified.")
    }
  }
  catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

//logout
router.patch('/user/logout', auth, async (req, res) => {
  const user = req.user

  try {
    user.tokens = user.tokens.filter((token) => {
      return token !== req.token
    })
    await user.save()

    res.send()
  }
  catch (e) {
    res.status(500).send()
  }
})

//display participants
router.get('/user/:id', auth, async (req, res) => {
  const userid = req.params.id

  let user = null

  const projection = {
    name: 1,
    email: 1,
    major: 1,
    school: 1
  }

  //const participantsArr = studygroup.participants

  if (!mongoose.isValidObjectId(userid)) {
    res.status(400).send("Invalid object id")
    return
  }

  if(user = (await User.findOne({_id: req.params.id}))){
      res.status(200).send(user)
  }
  else{
    res.status(400).send("400 error")
  }
})

module.exports = router