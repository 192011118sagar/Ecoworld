const router = require('express').Router();
const {RegisterUser , CreateAdmin} = require("../controllers/register")
const LoginUser = require("../controllers/LoginUser");
const { createcampaign, upload } = require('../controllers/createcampaign');
// const { raiseComplaint } = require('../controllers/raisecomplaint');
// const upload = require('../middleware/upload');
const getcomplaints = require('../controllers/getcomplaints');
const { postgarbage, getgarbage } = require('../controllers/Nearbygarbage');
const wastecollectschudule = require('../controllers/wastecollectingschudule');
const { AssignSchudule } = require('../Admin/Assignpersioncollectingwaste');
const getwastecollect = require('../controllers/getwasteschdule');


router.route('/register').post(RegisterUser);
router.route('/login').post(LoginUser);
router.route('/createadmin').post(CreateAdmin);
router.post('/createcampaign', upload.single('eventimage'), createcampaign);
// router.post('/raisecomplaint', raiseComplaint);
router.route('/getcomplaints/status/:status').get(getcomplaints);
router.route('/garbage').post(postgarbage);
router.route('/garbage').get(getgarbage);
router.route('/wastecollecting').post(wastecollectschudule);
router.route('/wastecollectschdule/status/:status').get(getwastecollect);
router.route('/getwastecollectschdule').get(getwastecollect);

module.exports = router;    
