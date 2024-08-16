const { updateComplaint, GetComplaint, getlabours}= require('../Admin/Assignpersion');
const { PendingCampaign, ApproveCampaign, Approvedcampaigns, Campaign } = require('../Admin/campaign');
const labour = require('../Admin/labour');
const router = require('express').Router();



router.route('/pendingcampaign').get(PendingCampaign);
router.route('/approvecampaign/:id').put(ApproveCampaign);
router.route('/approvedcampaign').get(Approvedcampaigns);
router.route('/campaign/:id').get(Campaign);
router.route('/labour').post(labour);
router.route('/assignlabour/:id').put(updateComplaint);
router.route('/getcomplaint').get(GetComplaint);
router.route('/getlabours').get(getlabours);

module.exports = router;
