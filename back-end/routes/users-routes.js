const express=require('express');
const router= express.Router();
const {check}= require('express-validator')

const userControllers= require("../controllers/users-controllers")



router.get('/',userControllers.getUsers);
router.post('/signup',[
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({min:6})
]
,userControllers.postSignUpUser);
router.post('/signin',userControllers.postLogInUser);

module.exports= router;