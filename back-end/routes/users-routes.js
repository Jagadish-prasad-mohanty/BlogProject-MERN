const express=require('express');
const router= express.Router();
const {check}= require('express-validator')

const userControllers= require("../controllers/users-controllers")
const fileUpload= require('../middleware/file-upload');



router.get('/',userControllers.getUsers);
router.post('/signup',
    fileUpload.single('profileImage')
    ,[
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({min:6})
]
,userControllers.postSignUpUser);
router.post('/signin',userControllers.postLogInUser);

module.exports= router;