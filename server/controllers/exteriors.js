import { pool } from '../config/database.js';

const getExteriors = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM exteriors';
        const results = await pool.query(selectQuery);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getExteriorByID = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM exteriors WHERE id = $1';
        const exteriorID = req.params.id;
        const results = await pool.query(selectQuery, [exteriorID]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getExteriors,
    getExteriorByID
};