import { pool } from '../config/database.js';

const getInteriors = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM interiors';
        const results = await pool.query(selectQuery);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getInteriorByID = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM interiors WHERE id = $1';
        const interiorID = req.params.id;
        const results = await pool.query(selectQuery, [interiorID]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getInteriors,
    getInteriorByID
};