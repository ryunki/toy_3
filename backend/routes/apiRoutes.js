const express = require('express')
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const getAllUsers = require('../controllers/user/getAllUsers');
const {registerUser, loginUser} = require('../controllers/auth/authControllers');
const {inviteUser, acceptInvitation, rejectInvitation} = require('../controllers/friendInvitation/friendInvitationControllers');

router.post('/register', registerUser)
router.post('/login', loginUser)

// router.use(verifyToken) 
router.get('/users',verifyToken, getAllUsers)
router.post('/invite', inviteUser)
router.post('/accept', acceptInvitation)
router.post('/reject', rejectInvitation)

module.exports = router