'use strict';

const jwt                 = require('jsonwebtoken');
const debug               = require('debug')('todo:userCtrl');
const User                = require(`${__dirname}/user-model`);
const AppError            = require(`${__dirname}/../../lib/app-error`);

const userCtrl            = module.exports = {};
userCtrl.newUser          = newUser;
userCtrl.findByUsername   = findByUsername;
userCtrl.findByAuthToken  = findByAuthToken;
userCtrl.manageUserLists  = manageUserLists;


/**
 * newUser - creates a new user in the database
 *  
 * @param  {object} reqBody the body of an incoming post request to /new-account 
 * @return {promise}        a promise that resolves with the user or rejects with an appError 
 */ 
function newUser(reqBody) {
  debug('newUser');
  return new Promise((resolve, reject) => {
    if (!reqBody.username || !reqBody.password || !reqBody.email) {
      return reject(new AppError(400, `Either username (${reqBody.username}) or password (${reqBody.password}) or email (${reqBody.email}) not provided.`));
    }
    // Ensure that only the desired info gets through 
    let userInfo = { 
      username: reqBody.username,
      password: reqBody.password,
      email:    reqBody.email
    };
    
    // TODO: check the error type to determine if it failed validation (400) or if it was a duplicate (409)
    User.create(userInfo, (err, user) => {
      if (err) {
        return reject(new AppError(400, err));
      } 
      return resolve(user);
    });
  });
}



/**
 * findByUsername - finds a user by username, checks password, then resolves w/ user
 *  
 * @param  {string} username description 
 * @param  {string} password description 
 * @return {promise}         a promise that resolves with mongo document of the user or rejects with an appError 
 */ 
function findByUsername(username, password) {
  debug('findByUsername');
  return new Promise((resolve, reject) => {
    User.findOne({ username })
    .populate('lists')
    .exec((err, user) => {
      if (err || !user || !user.comparePassword(password)) {
        return reject(new AppError(401, err || 'incorrect username or password'));
      }
      return resolve(user);
    });
  });
}



/**
 * findByAuthToken - this looks up a user by the authorization token that they provide in their requests
 *                 - TODO: implement the populate as an option so it doesnt do that for every request
 *  
 * @param  {string}   token   a string that is an encoded jsonwebtoken  
 * @return {promise}          a promise that resolves with the user the webtoken belongs to or rejects with an appError 
 */ 
function findByAuthToken(token) {
  debug('findByAuthToken');
  return new Promise((resolve, reject) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET || '0112358');
    } catch (err) {
      return reject(new AppError(401, 'failed to parse authorization token'));
    }
    User.findById(decoded._id)
      .populate('lists')
      .exec((err, user) => {
        if (err) {
          return reject(new AppError(400, `Mongoose error finding user with id ${decoded._id}`));
        }
        if (!user) {
          return reject(new AppError(401, 'No user exists with that id'));
        }
        return resolve(user);
      });
  });
}




/**
 * manageUserLists - this is used to manage a user's lists
 *  
 * @param  {object}   list    description 
 * @param  {object}   user    description 
 * @param  {object}   options description 
 * @return {promise}          description 
 */ 
function manageUserLists(list, user, options = {}) {
  debug('manageUserLists');
  
  let updateOperator = '$push';
  if (options.removeFlag) {
    debug('handleListItems removeFlag true');
    updateOperator = '$pull';
  }
  
  let updatesToUser = {};
  updatesToUser[updateOperator] = { lists: list._id };
  
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: user._id }, 
      updatesToUser, 
      { runValidators: true, new: true }, 
      (err, updatedUser) => {
        if (err || !updatedUser) {
          return reject(new AppError(400, err || 'no user existed, shouldnt have happened'));
        }
        return resolve(updatedUser);
      });
  }); 
  
}
