var Workout = require('../models/workout');
var mongoose = require('mongoose');
var jsonpatch = require('fast-json-patch');

var create = function(req, res){
  var newWorkout = {
    title: req.body.title,
    objective: req.body.objective,
    tags: req.body.tags,
    author: req.body.author,
    sets: req.body.sets
  };
  Workout.create(newWorkout, function(err, doc){
    err ? console.log(err) && res.send(err) :
    res.send({success: true, message: 'Workout successfully created!', object: doc});
  });
};

var remove = function(req,  res){
  Workout.findByIdAndRemove(req.params.id, function(err, doc){
    err ? res.send(err) :
    res.send({success: true, message: 'Workout  successfully deleted', object: doc});
  });
};

var  update = function(req, res){
  var patches =  req.body;
  Workout.findById(req.params.id, function(err, doc){
    err ? res.send(err) :
    doc.patch(patches, function(err){
      if(err){ res.send(err);}
      doc.save(function(err){
        if(err) {res.send(err);}
        else {res.send("Update(s) successful" + user);}
      });
    });
  });
};

var getOne = function(req, res){
  Workout.findById(req.params.id, function(err, doc){
    err ? res.send(err) :
    res.json(doc);
  });
};

var getAll = function(req, res){
  var config = {};
  if(req.query.author){
    config.author = req.query.author;
  }
  else if(req.query.title){
    config.title = req.query.title;
  }
  else if(req.query.tags){
    var elements = {};
    req.query.tags.forEach(function(tag){
      elements.append({$elemMatch: tag});
    });
    config.tags = {$all: elements};
  }
  Workout.find(config, function(err, doc){
    err ? res.send(err) :
    res.send(doc);
  });
};

module.exports = {
  createWorkout: create,
  removeWorkout: remove,
  updateWorkout: update,
  getWorkout: getOne,
  getWorkouts: getAll
}
