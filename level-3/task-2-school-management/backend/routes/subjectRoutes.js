const express = require("express");
const router = express.Router();
const { pool } = require("../database/database");

router.get("/", async (req, res, next) => {
  try {
    const response = await pool.query('SELECT * FROM subjects ORDER BY id');
    res.status(200).send({ success: true, message: "All subjects returned", results: response.rows });
    return;
  } catch (err) {
    return next(err);
  }
});

module.exports = router;