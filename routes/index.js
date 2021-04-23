const express = require('express')
const router = express.Router()


//Login/Landing page
//Route GET /
router.get('/', (req,res)=>{
    res.render('login',{
        layout:'login',
    })
})

//Dashboard
//Route Get /dashboard
router.get('/dashboard', (req,res)=>{
    res.render('dashboard')
})





module.exports = router