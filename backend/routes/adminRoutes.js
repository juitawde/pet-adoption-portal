const express = require('express');

const { adminPets, adminApplications, dashboard } = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate, authorize('admin'));

router.get('/pets', adminPets);
router.get('/applications', adminApplications);
router.get('/dashboard', dashboard);

module.exports = router;
