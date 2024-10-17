import dotenv from 'dotenv'
import { pool } from './database.js'
import './dotenv.js'
import carData from '../data/cars.js';
import exteriors from '../data/exteriors.js';
import roofs from '../data/roofs.js';
import wheels from '../data/wheels.js';
import interiors from '../data/interiors.js';

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            convertible BOOLEAN NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 cars table created successfully');
    } catch (err) {
        console.error('⚠️ error creating cars table', err);
    }
};

const createExteriorsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS exteriors;

        CREATE TABLE IF NOT EXISTS exteriors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 exteriors table created successfully');
    } catch (err) {
        console.error('⚠️ error creating exteriors table', err);
    }
};

const createRoofsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS roofs;

        CREATE TABLE IF NOT EXISTS roofs (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 roofs table created successfully');
    } catch (err) {
        console.error('⚠️ error creating roofs table', err);
    }
};

const createWheelsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS wheels;

        CREATE TABLE IF NOT EXISTS wheels (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 wheels table created successfully');
    } catch (err) {
        console.error('⚠️ error creating wheels table', err);
    }
};

const createInteriorsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS interiors;

        CREATE TABLE IF NOT EXISTS interiors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 interiors table created successfully');
    } catch (err) {
        console.error('⚠️ error creating interiors table', err);
    }
};

const insertCarData = async () => {
    const insertQuery = `
        INSERT INTO cars (name, convertible, exterior, roof, wheels, interior)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

    try {
        for (const car of carData) {
            const { name, convertible, exterior, roof, wheels, interior } = car;
            await pool.query(insertQuery, [name, convertible, exterior, roof, wheels, interior]);
        }
        console.log('🎉 car data inserted successfully');
    } catch (err) {
        console.error('⚠️ error inserting car data', err);
    }
};

const insertExteriorsData = async () => {
    const insertQuery = `
        INSERT INTO exteriors (name, price)
        VALUES ($1, $2)
    `;

    try {
        for (const exterior of exteriors) {
            const { name, price } = exterior;
            await pool.query(insertQuery, [name, price]);
        }
        console.log('🎉 exteriors data inserted successfully');
    } catch (err) {
        console.error('⚠️ error inserting exteriors data', err);
    }
};

const insertRoofsData = async () => {
    const insertQuery = `
        INSERT INTO roofs (name, price)
        VALUES ($1, $2)
    `;

    try {
        for (const roof of roofs) {
            const { name, price } = roof;
            await pool.query(insertQuery, [name, price]);
        }
        console.log('🎉 roofs data inserted successfully');
    } catch (err) {
        console.error('⚠️ error inserting roofs data', err);
    }
};

const insertWheelsData = async () => {
    const insertQuery = `
        INSERT INTO wheels (name, price)
        VALUES ($1, $2)
    `;

    try {
        for (const wheel of wheels) {
            const { name, price } = wheel;
            await pool.query(insertQuery, [name, price]);
        }
        console.log('🎉 wheels data inserted successfully');
    } catch (err) {
        console.error('⚠️ error inserting wheels data', err);
    }
};

const insertInteriorsData = async () => {
    const insertQuery = `
        INSERT INTO interiors (name, price)
        VALUES ($1, $2)
    `;

    try {
        for (const interior of interiors) {
            const { name, price } = interior;
            await pool.query(insertQuery, [name, price]);
        }
        console.log('🎉 interiors data inserted successfully');
    } catch (err) {
        console.error('⚠️ error inserting interiors data', err);
    }
};

const resetDatabase = async () => {
    await createCarsTable();
    await createExteriorsTable();
    await createRoofsTable();
    await createWheelsTable();
    await createInteriorsTable();
    await insertCarData();
    await insertExteriorsData();
    await insertRoofsData();
    await insertWheelsData();
    await insertInteriorsData();
    pool.end();
};

resetDatabase();