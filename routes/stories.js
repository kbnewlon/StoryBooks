const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

//Show add page
//Route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

//Dashboard
//Route Get /dashboard



module.exports = router