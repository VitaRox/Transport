const express = require('express');
const router = express.Router();

const HttpError = require('../models/http-error');

// Dummy User account data
const DUMMY_USERS = [
  {
    id: '1',
    username: 'flexingAardvark',
    email: 'aVark@email.com',
    password: 'pass'
  },
  {
    id: '2',
    username: 'sparkleBoi420',
    email: 'sp420@ourmail.com',
    password: 'badonk'
  },
  {
    id: '3',
    username: 'Princess_CremeDeMenthe',
    email: 'skaarsgard@biffMail.com',
    password: 'crimsonturkey'
  },
  {
    id: '4',
    username: 'Clifford_Notes',
    email: 'student@lawyer.com',
    password: 'chipperSun'
  },
  {
    id: '5',
    username: 'Doge_Fan_9',
    email: 'mymail@yourmail.com',
    password: 'quipSprackter'
  },
  {
    id: '6',
    username: 'Jinx_Monsoon',
    email: 'artspore@address.org',
    password: 'yupYesYeah'
  },
];

// Admin-only route for dev purposes: show all Users' data
// TODO: remove this before production build!!!!!!!
// WORKS
router.get(`/`, (req, res, next) => {
  console.log("Fetch all Users' data");
  res.json(DUMMY_USERS);
});

// Fetches an existing User account by userId;
router.get(`/:userId`, (req, res, next) => {
  console.log("GET request made to fetch a User by their userId");

  const userId = req.params.userId;
  const user = DUMMY_USERS.find(u => {
    return u.id === userId;
  });

  if (!user) {
    return next(
      new HttpError('User not found.', 404)
    );
  }
  res.json({ user });
});

// Creates a new User account with input from response body
router.post(`/`, (req, res, next) => {
  console.log("POST request made to create a new User!");
  // TODO: Parse json input and create new User instance
  // TODO: Store User instance in database
  res.json({ message: "POST new user is working dandy." });
});

module.exports = router;
