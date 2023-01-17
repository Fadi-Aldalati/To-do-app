const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Task,validate} = require ('../models/task');

router.post('/',async(req,res)=>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let task = new Task({title:req.body.title});
    task = await task.save();
    res.send(task);
});

router.get('/',async(req,res)=>{
    const tasks= await Task.find().sort('title');
    res.send(tasks);
});

router.delete('/:id',async(req,res)=>{
    const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

module.exports = router;