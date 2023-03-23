const {Router} = require('express');
const router = Router();
const {check} = require("express-validator");
const {createBoard,getBoardNames,deleteBoard,getBoard,updateBoard} = require("../controllers/board");
const { fieldValidator } = require('../middlewares/fieldValidator');
const {validateJWT} = require('../middlewares/validateJWT');

router.use(validateJWT);

router.post(
      '/getBoard',
      [
        check('id','board id is required').not().isEmpty(),
        fieldValidator
      ],
      getBoard
    )

router.post
(
    '/create',
    [
        check('name','name is required').not().isEmpty(),
        check('columns','board of the columns cannot be empty').isLength({min:1}),
        check('user','user is required').not().isEmpty(),
        fieldValidator
    ],
    createBoard
)

 router.post
 ('/names',
 [
  check('userId','user ID is required').not().isEmpty(),
  fieldValidator
 ],
 getBoardNames
 );

 router.put
 (
  '/:id',
  [
    check('name','name cannot be empty').not().isEmpty(),
    check('columns','columns cannot be empty').isLength({min:1}),
    fieldValidator
  ],
 updateBoard
 );
 router.delete('/:id',deleteBoard);


module.exports = router;