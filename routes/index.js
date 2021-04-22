const express = require('express')
const router = express.Router()


//Login/Landing page
//Route GET /
router.get('/', (req,res)=>{
    res.send("Login")
})

//Dashboard
//Route Get /dashboard
router.get('/dashboard', (req,res)=>{
    res.send("Dashboard")
})





module.exports = router