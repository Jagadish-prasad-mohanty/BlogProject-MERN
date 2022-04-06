const express=require('express');
const router=express.Router();

const placesControllers=require('../controllers/places-controllers')

router.get('/:pid',placesControllers.getPlaceById);
router.get('/user/:uid',placesControllers.getPlacesByUserId);
router.post('/',placesControllers.postCreatePlace);
router.patch('/:pid',placesControllers.patchUpdatePlaceById);
router.delete('/:pid',placesControllers.patchDeletePlaceById);

module.exports=router;