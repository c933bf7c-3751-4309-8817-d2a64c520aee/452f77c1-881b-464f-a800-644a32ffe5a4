const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('parkings.db');

module.exports = {
  getAllSlots: (callback) => {
    db.all("SELECT * FROM parking_slots", [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  },
  updateSlot: (slotId, isOccupied, callback) => {
    db.run(
      "UPDATE parking_slots SET is_occupied = ? WHERE id = ?",
      [isOccupied, slotId],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null);
      }
    );
  }
};
