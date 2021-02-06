const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project-model');
const Task = require('../models/task-model');


// Retrieve list of projects
router.get('/projects', (req, res, next) => {
  Project.find()
    .populate('tasks')
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})


// Create new project
router.post('/projects', (req, res, next) => {
  Project.create({
      title: req.body.title,
      description: req.body.description,
      tasks: []
    })
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.status(500).json(error)
    });
})


// Retrieve details of a specific project
router.get('/projects/:projectId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Project.findById(req.params.projectId)
    .populate('tasks')
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})


// Update a project
router.put('/projects/:projectId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Project.findByIdAndUpdate(req.params.projectId, req.body)
    .then(() => {
      res.json({
        message: `Project with ${req.params.projectId} is updated succesfully.`
      })
    })
    .catch(error => {
      res.status(500).json(error)
    })
});


// Delete a project
router.delete('/projects/:projectId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Project.findByIdAndRemove(req.params.projectId)
    .then(() => {
      res.json({
        message: `Project with ${req.params.projectId} has been removed`
      })
    })
    .catch(error => {
      res.status(500).json(error)
    });
});



module.exports = router;