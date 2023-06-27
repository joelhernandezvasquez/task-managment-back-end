const {Router} = require('express');
const router = Router();
const {check} = require("express-validator");
const {createBoard,getBoards,getBoardNames,deleteBoard,getBoard,updateBoard,addTask,updateSubstasks,deleteTask,updateTask} = require("../controllers/board");
const { fieldValidator } = require('../middlewares/fieldValidator');
const {validateJWT} = require('../middlewares/validateJWT');

router.use(validateJWT);

router.get('/getBoards',getBoards);

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

 router.post('/create/task',
 [
   check('boardId','ID of the board is required').not().isEmpty(),
   check('userId','user ID is required').not().isEmpty(),
   check('name','name is required').not().isEmpty(),
   check('description','description is required').not().isEmpty(),
   check('substasks','substasks cannot be empty').isLength({min:1}),
   check('status','status is required').not().isEmpty(),
   fieldValidator

 ],
 addTask
 )

 router.put(
  '/update/task/:id',
   [
    check('_id','task id cannot be empty').not().isEmpty(),
    check('name','name cannot be empty').not().isEmpty(),
    check('description','description cannot be empty').not().isEmpty(),
    check('substasks','substasks cannot be empty').isLength({min:1}),
    check('status', 'status cannot be empty').not().isEmpty(),
    fieldValidator
   ]
 ,
 updateTask);

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
 
 router.delete(
  '/task/:id',deleteTask
 );



 
 router.put(
  '/substask/:id',
  [
   check('taskId', 'taskId is required').not().isEmpty(),
   check('substask','substask is required').not().isEmpty(),
   fieldValidator
  ],
  
  updateSubstasks);

  


module.exports = router;