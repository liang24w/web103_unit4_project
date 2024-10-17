import { pool } from '../config/database.js';

const getRoofs = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM roofs';
        const results = await pool.query(selectQuery);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRoofByID = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM roofs WHERE id = $1';
        const roofID = req.params.id;
        const results = await pool.query(selectQuery, [roofID]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getRoofs,
    getRoofByID
};