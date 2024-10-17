import { pool } from '../config/database.js'

const getCars = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM cars';
        const results = await pool.query(selectQuery);
        console.log('Server: Fetching all cars:', results.rows);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Server: Error fetching cars:', error);
        res.status(500).json({ error: error.message });
    }
};

const getCarByID = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM cars WHERE id = $1';
        const carID = req.params.id;
        console.log(`Server: Fetching car with ID: ${carID}`);
        const results = await pool.query(selectQuery, [carID]);
        console.log(`Server: Car with ID ${carID}:`, results.rows);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Server: Error fetching car by ID:', error);
        res.status(500).json({ error: error.message });
    }
};

const createCar = async (req, res) => {
    try {
        const { name, convertible, exterior, roof, wheels, interior } = req.body;
        const insertQuery = `
            INSERT INTO cars (name, convertible, exterior, roof, wheels, interior)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const results = await pool.query(insertQuery, [name, convertible, exterior, roof, wheels, interior]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, convertible, exterior, roof, wheels, interior } = req.body;
        const updateQuery = `
            UPDATE cars
            SET name = $1, convertible = $2, exterior = $3, roof = $4, wheels = $5, interior = $6
            WHERE id = $7
            RETURNING *
        `;
        const results = await pool.query(updateQuery, [name, convertible, exterior, roof, wheels, interior, id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleteQuery = 'DELETE FROM cars WHERE id = $1 RETURNING *';
        const results = await pool.query(deleteQuery, [id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getCars,
    getCarByID,
    createCar,
    updateCar,
    deleteCar
};