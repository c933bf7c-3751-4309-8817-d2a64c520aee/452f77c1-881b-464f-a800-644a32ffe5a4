const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('parkings.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS parking_slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slot_number TEXT NOT NULL,
    is_occupied INTEGER NOT NULL
  )`);

  // Initialize slots if they don't exist
  const slots = ["slot_1", "slot_2", "slot_3", "slot_4"];
  slots.forEach((slot, index) => {
    db.run(`INSERT INTO parking_slots (slot_number, is_occupied) VALUES (?, ?)`, [slot, 0], function(err) {
      if (err && err.message.includes('UNIQUE constraint failed')) {
        // Ignore duplicate entry error
      }
    });
  });
});

db.close();
