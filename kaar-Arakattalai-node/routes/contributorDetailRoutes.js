const express = require('express');
const router = express.Router();
const ContributorDetailController = require('../controllers/contributorDetailController');

// Get all contributors
router.get('/', ContributorDetailController.getAllContributors);

// Get contributor by ID
router.get('/:id', ContributorDetailController.getContributorById);

// Get contributor by Employee AID
router.get('/employee/:employeeAid', ContributorDetailController.getContributorByEmployeeAid);

// Create new contributor
router.post('/', ContributorDetailController.createContributor);

// Update contributor
router.put('/:id', ContributorDetailController.updateContributor);

// Deactivate contributor
router.delete('/:id', ContributorDetailController.deactivateContributor);

module.exports = router;
