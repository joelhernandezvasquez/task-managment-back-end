const {Router} = require('express');

const router = Router();
const {check} = require("express-validator");
const {loginUser,createUser,revalidateToken} = require("../controllers/auth");
const { fieldValidator } = require('../middlewares/fieldValidator');
const {validateJWT} = require('../middlewares/validateJWT');

router.post
(
 '/',
 [
    check('email','email is required').isEmail(),
    check('password','password must be at least 6 characters').isLength({min:6}),
    fieldValidator
 ],

 loginUser
 );

router.post
(
'/register',
[
    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','password must be at least 6 characters').isLength({min:6}),
    fieldValidator
],
createUser
);

router.get('/renew',validateJWT,revalidateToken);

module.exports = router;