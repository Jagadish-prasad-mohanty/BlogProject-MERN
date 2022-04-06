const express=require('express');
const router=express.Router();

const placesControllers=require('../controllers/places-controllers')

router.get('/:pid',placesControllers.getPlaceById);
router.patch('/:pid',placesControllers.patchPlaceById);
router.get('/user/:uid',placesControllers.getPlacesByUserId);
router.post('/',placesControllers.postCreatePlace);

module.exports=router;