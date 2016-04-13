var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var patcher = require('mongoose-json-patch');
var validator = require('../validation/index');

// Athletic Experience entry for Bio Section
var athleticExperience = new Schema({
  sport: {type: String, required: true},
  organization: String,
  yearsExperience: {type: Number, required: true},
  description: String
})

// Certification object for Coach's roleSpecificData
var certification = new Schema({
  organization: {type: String, required: true},
  level:  {type: String, required: false},
  verified: {type: Boolean, required: true}
})

// If the user is a coach, his roleSpecificData will include this:
// var coachData = new Schema({
//   about: {type: String, required: true, default: "About me"},
//   certifications: {type: [certification], default: []},
//   backgroundCheck: {
//     type: {type: String, required:  true, default:  "none"},
//     expires: {type: Date, required: true}
//   },
//   reviews: {type: [String], default: []},
//   roster: {type: [String], default: []}
// })
// If the user is an Athlete, his roleSpecificData will include a subscription:
// var subscription = new Schema({
//   tier: String,
//   coaches: [String],
//   isActive: {type: Boolean, required: true},
//   start: {type: Date, required: true},
//   ends: {type: Date, required: true}
// })

// General User schema
// TODO: Add  Validators
var userSchema = new Schema({
  username: {type: String, unique: true, required: true, validate: {validator: validator.lowerCaseString,  message: '{VALUE} is not a valid input!'}},// Created at init
  password: {type: String,required: true, validate: {validator: validator.password,  message: '{VALUE} is not a valid input!'}},              // Created at init, but updatable
  email: {type: String, unique: true, required: true, validate: {validator: validator.email,  message: '{VALUE} is not a valid input!'}},                                       //Created at init, but updateable
  role: {type: String, required: true, enum: validator.roles},     // Created at init
  lastActive: {type: Date, default: (new Date())},                        // Updated on login & activity
  threads: {type: [String], default: []},                    // Updated on new thread creation
  bio: {                                 // Initially blank, updated under profile
    name: {type: String, default: "", required: false},
    born: {type: Date, default: (new Date())},
    location: {type: String, default: ""},
    picture: {type: String, default: ""}, // Urls
    athletics: {type: [athleticExperience], default: []}, // Objects
    interests: {type: [String], default: []} // Strings
  },
  subscription: {
    type: {type: String, default: "athlete"},
    tier: {type: Number, default: 0},
    activeUntil: {type: String}
  },
  coachData: {
    about: {type: String, required: true, default: "About me"},
    certifications: {type: [certification], default: []},
    backgroundCheck: {
      type: {type: String, default:  "none"},
      expires: {type: Date}
  },
  reviews: {type: [String], default: []},
  roster: {type: [String], default: []}},
  athleteData: {
    seasons: {type: [String], default: []}, // Object Id's
    coaches: {type: [String], default: []}, // Object Id's
    videos: {type: [String], default: []}, // Urls
    files: {type: [String], default: []},  // Urls
  }
});

userSchema.plugin(patcher);

module.exports = mongoose.model('User', userSchema);
