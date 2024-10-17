import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import CarsAPI from '../services/CarsAPI';
import { calculateTotalPrice } from '../utilities/calcprice';

const CarDetails = () => {
    const { id: carId } = useParams();
    const navigate = useNavigate();
    const [isConvertible, setIsConvertible] = useState(false);
    const [carName, setCarName] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({
        exterior: null,
        interior: null,
        roof: null,
        wheel: null,
    });
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await CarsAPI.getCarById(carId);
                const carDetails = response[0];
                setIsConvertible(carDetails.convertible);
                setCarName(carDetails.name);
                setSelectedOptions({
                    exterior: carDetails.exterior,
                    interior: carDetails.interior,
                    roof: carDetails.roof,
                    wheel: carDetails.wheels,
                });

                const price = await calculateTotalPrice({
                    exterior: carDetails.exterior,
                    interior: carDetails.interior,
                    roof: carDetails.roof,
                    wheel: carDetails.wheels,
                });
                setTotalPrice(price);

                console.log('selectedOptions, inside fetchCarDetails: ', selectedOptions);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [carId]);

    const handleDelete = async () => {
        try {
            await CarsAPI.deleteCar(carId);
            navigate('/customcars'); // Redirect to the list of cars after deletion
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${carId}`); // Redirect to the edit page
    };

    return (
        <div style={{ padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', borderRadius: '5px' }}>
            <h1>{carName}</h1>
            <p>Convertible: {isConvertible ? 'Yes' : 'No'}</p>
            <p>Exterior: {selectedOptions.exterior}</p>
            <p>Interior: {selectedOptions.interior}</p>
            <p>Roof: {selectedOptions.roof}</p>
            <p>Wheel: {selectedOptions.wheel}</p>
            <p>Total Price: ${totalPrice}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default CarDetails;