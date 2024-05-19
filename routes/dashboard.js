const express = require('express');
const router = express.Router();
const db = require('../db');

// Home page - Dashboard
router.get('/', (req, res) => {
  res.render('pages/dashboard', {
    name: process.env.NAME,
    dashboardTitle: process.env.DASHBOARD_TITLE
  });
});

// Parkir page
router.get('/parkir-page', (req, res) => {
  res.render('pages/parkir-page');
});

// API route to get all slots
router.get('/api/slots', (req, res) => {
  db.getAllSlots((err, slots) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.json(slots);
  });
});

// API route to update a slot
router.put('/api/slots/:slotId', express.json(), (req, res) => {
  const slotId = req.params.slotId;
  const isOccupied = req.body.is_occupied;

  db.updateSlot(slotId, isOccupied, (err) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.sendStatus(200);
  });
});

module.exports = router;
