import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import ExteriorsAPI from '../services/ExteriorsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';
import CarsAPI from '../services/CarsAPI';
import { calculateTotalPrice } from '../utilities/calcprice';
import { validateConvertibleOptions } from '../utilities/validation'; // Import the validation function

const EditCar = () => {
    const navigate = useNavigate();
    const { id: carId } = useParams();
    const [isConvertible, setIsConvertible] = useState(false);
    const [carName, setCarName] = useState('');
    const [options, setOptions] = useState([]);
    const [optionType, setOptionType] = useState('');
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
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
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [carId]);

    useEffect(() => {
        const updatePrice = async () => {
            const price = await calculateTotalPrice(selectedOptions);
            setTotalPrice(price);
        };
        updatePrice();
    }, [selectedOptions]);

    const handleButtonClick = async (type) => {
        setOptionType(type);
        let data = [];
        try {
            if (type === 'Exteriors') {
                data = await ExteriorsAPI.getAllExteriors();
            } else if (type === 'Interiors') {
                data = await InteriorsAPI.getAllInteriors();
            } else if (type === 'Roofs') {
                data = await RoofsAPI.getAllRoofs();
            } else if (type === 'Wheels') {
                data = await WheelsAPI.getAllWheels();
            }
            setOptions(data);
            setShowOptionsMenu(true);
        } catch (error) {
            console.error(`Error fetching ${type.toLowerCase()}:`, error);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [optionType.toLowerCase().replace(/s$/, '')]: option.name,
        }));
    };

    const renderOptionsMenu = () => {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px', 
                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                padding: '10px', 
                borderRadius: '5px', 
                marginTop: '20px',
                color: 'white'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    gap: '10px'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '10px', 
                        flex: '1'
                    }}>
                        {options.map((option) => (
                            <button 
                                key={option.name} 
                                onClick={() => handleOptionSelect(option)}
                                style={{ 
                                    border: '1px solid white', 
                                    padding: '10px', 
                                    borderRadius: '5px',
                                    textAlign: 'left', // Align text to the left
                                    backgroundColor: selectedOptions[optionType.toLowerCase().replace(/s$/, '')] === option.name ? 'gray' : ''
                                }}
                            >
                                <div>{option.name}</div>
                                <div>${option.price}</div>
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setShowOptionsMenu(false)} 
                        style={{ 
                            padding: '10px', 
                            borderRadius: '5px',
                            backgroundColor: 'white', 
                            color: 'black'
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    };

    const handleUpdateCar = async () => {
        if (!validateConvertibleOptions(isConvertible, selectedOptions)) {
            alert('Convertible cars must have a soft top roof.');
            return;
        }

        const updatedCar = {
            name: carName,
            convertible: isConvertible,
            exterior: selectedOptions.exterior,
            roof: selectedOptions.roof,
            wheels: selectedOptions.wheel,
            interior: selectedOptions.interior,
        };

        try {
            const response = await CarsAPI.updateCar(carId, updatedCar);
            console.log('Car updated successfully:', response);
            navigate('/customcars');
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };

    return (
        <div>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                padding: '10px', 
                borderRadius: '5px' 
            }}>
                <button onClick={() => handleButtonClick('Exteriors')} >Exteriors</button>
                <button onClick={() => handleButtonClick('Interiors')} >Interiors</button>
                <button onClick={() => handleButtonClick('Roofs')} >Roofs</button>
                <button onClick={() => handleButtonClick('Wheels')} >Wheels</button>
                <input
                    type="text"
                    placeholder="Car Name"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    style={{ padding: '5px', borderRadius: '3px' }}
                />
                <button onClick={handleUpdateCar} >Update</button>
            </div>
            <div style={{ marginTop: '20px', color: 'white' }}>
                <h2>Total Price: ${totalPrice}</h2>
            </div>
            {showOptionsMenu && renderOptionsMenu()}
        </div>
    );
};

export default EditCar;