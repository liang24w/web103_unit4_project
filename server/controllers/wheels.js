import { pool } from '../config/database.js';

const getWheels = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM wheels';
        const results = await pool.query(selectQuery);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getWheelByID = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM wheels WHERE id = $1';
        const wheelID = req.params.id;
        const results = await pool.query(selectQuery, [wheelID]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getWheels,
    getWheelByID
};