const {response} = require('express');
const Board = require('../models/Boards');

const createBoard = async (req,res = response) =>{

    try{
      const board = new Board(req.body);
      const saveBoard =  await board.save();
      
     return res.status(200).json({
       ok:true,
       board:saveBoard
     })
    }
    
    catch(error){
        console.log(error);
        if(error.code === 11000){
          return res.status(401).json({
            ok:false,
            msg:'The board you are trying to create already exist.',
        })
        }
        return res.status(500).json({
            ok:false,
            msg:'Please contact admin',
        })
    }

 }

 const getBoardNames = async (req,res = response) =>{

    try{
     
     const {userId} = req.body;
     const board =  await Board.find({user:userId},'name').exec();
      
    if(board.length < 1){
      return res.status(401).json({
        ok:false,
        msg:'unauthorized'
      })
    }
     
     return res.status(200).json({
       ok:true,
       board_names:board
     })
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Please contact admin',
        })
    }

 }


 const getBoard = async (req,res=response) =>{
   
  const {id:boardId} = req.body;
  
  try{
    const board = await Board.findById(boardId);

    return res.status(200).json({
      ok:true,
      name:board.name,
      columns:board.columns,
      tasks:board.tasks
    })
    
  }
  catch(error){
    console.error(error);
    return res.status(500).json({
      ok:false,
      board:'please communicate with Admin'
    })

 }
}

const addTask = async (req,res=response) =>{
    
    const {boardId,userId,name,description,substasks,status} = req.body;
   
    try{
      const board = await Board.findById(boardId);

      if(!board){
        return res.status(404).json({
          ok:false,
          message:'Board not found'
        })
      }

      if(board.user.toString() !== userId){
        return res.status(401).json({
          ok:false,
          msg:'you are not allowed to add task to this board'
       })

      }

      const newTask = {name,description,substasks,status};
      const tasks = [...board.tasks,newTask];

      const newBoard = {
        _id:board._id,
        name:board.name,
        columns:board.columns,
        user:board.user,
        tasks:tasks
      }
    
      await Board.findByIdAndUpdate(boardId,newBoard,{new:true});
     
      return res.status(201).json({
      success:true,
   })
    }
    catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Please contact administrator..'
       })
    }

  }


const updateBoard = async (req,res=response) =>{
   
  const boardId = req.params.id;

  try{
     const board = await Board.findById(boardId);

     if(!board){
      return res.status(404).json({
        success:false,
        message:'Board not found'
      })
     }

     const newBoard = {...req.body};

     await Board.findByIdAndUpdate(boardId,newBoard,{new:true});

     return res.status(201).json({
      success:true
     })
  }
  catch(error){
     console.error(error);
     return res.status(500).json({
      success:false,
      message:'Please contact administrator..'
     })
  }
  
}

 const deleteBoard = async (req,res = response) =>{
  const boardId = req.params.id;
  const userId = req.uid;

    try{
        const board = await Board.findById(boardId);

        if(!board){
           return res.status(404).json({
                ok:false,
                msg:'Board not found'
            })}

            if(board.user.toString() !== userId){
                return res.status(401).json({
                   ok:false,
                   msg:'you are not allowed to elminate this board'
                })
               }

 await Board.findByIdAndDelete(boardId);

 return res.status(200).json({
    ok:true
 })
  }

    catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'talk to administrator'
        })
    }
 }

 const updateSubstasks = async (req,res=response) =>{
   const boardId = req.params.id;
   const {taskId,substask} = req.body;

   try{
     const board = await Board.findById(boardId);
     
     if(!board){
       return res.status(404).json({
        success:false,
        message:'Board not found'
       })
     }
   
      const newTasks = board.tasks.map((task) => {
       
        if(task._id.toString() === taskId)
         {
           const substasksToUpdate = task.substasks.map((substaskItem)=> substaskItem._id.toString() === substask._id ? substask : substaskItem);
           const newTask = {
            name:task.name,
            description:task.description,
            substasks:substasksToUpdate,
            status:task.status,
            _id:task._id
           }
           return newTask;
         }
         return task;
      })
    
    await Board.findByIdAndUpdate(boardId,{tasks:newTasks},{ runValidators: true, new: true });
     
    return res.status(201).json({
     success:true
   })

   }
   catch(error){
    console.error(error);
        res.status(500).json({
            ok:false,
            msg:'talk to administrator'
        })
   }
   
 }



  module.exports = {
   createBoard,
   getBoardNames,
   getBoard,
   updateBoard,
   deleteBoard,
   addTask,
   updateSubstasks
  }