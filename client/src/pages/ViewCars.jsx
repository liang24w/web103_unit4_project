import React, { useEffect, useState } from 'react';
import '../App.css';
import CarsAPI from '../services/CarsAPI';
import { calculateTotalPrice } from '../utilities/calcprice';

const ViewCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await CarsAPI.getAllCars();
                const carsWithPrices = await Promise.all(response.map(async (car) => {
                    const totalPrice = await calculateTotalPrice({
                        exterior: car.exterior,
                        interior: car.interior,
                        roof: car.roof,
                        wheel: car.wheels,
                    });
                    return { ...car, totalPrice };
                }));
                setCars(carsWithPrices);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    return (
        <div>
            <h1>View Cars</h1>
            <div>
                {cars.map((car) => (
                    <div key={car.id} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', marginBottom: '20px' }}>
                        <h2>{car.name}</h2>
                        <p>Convertible: {car.convertible ? 'Yes' : 'No'}</p>
                        <p>Exterior: {car.exterior}</p>
                        <p>Interior: {car.interior}</p>
                        <p>Roof: {car.roof}</p>
                        <p>Wheels: {car.wheels}</p>
                        <p>Total Price: ${car.totalPrice}</p>
                        <a href={`/customcars/${car.id}`} role='button'>Details</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCars;