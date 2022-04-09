const express=require('express');
const router=express.Router();
const {check} =require('express-validator')

const placesControllers=require('../controllers/places-controllers')

router.get('/:pid',placesControllers.getPlaceById);
router.get('/user/:uid',placesControllers.getPlacesByUserId);
router.post('/',
        [
            check('title').not().isEmpty(),
            check('description').isLength({min:5}),
            check('address').not().isEmpty()
        ]

        ,placesControllers.postCreatePlace);
router.patch('/:pid',
    [   
        check('title').not().isEmpty(),
        check('description').isLength({min:5}),
    ]
,placesControllers.patchUpdatePlaceById);
router.delete('/:pid',placesControllers.patchDeletePlaceById);

module.exports=router;