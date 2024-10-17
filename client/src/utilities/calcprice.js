import ExteriorsAPI from '../services/ExteriorsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const fetchOptionPriceByName = async (type, name) => {
    let options = [];
    switch (type) {
        case 'exterior':
            options = await ExteriorsAPI.getAllExteriors();
            break;
        case 'interior':
            options = await InteriorsAPI.getAllInteriors();
            break;
        case 'roof':
            options = await RoofsAPI.getAllRoofs();
            break;
        case 'wheel':
            options = await WheelsAPI.getAllWheels();
            break;
        default:
            return 0;
    }
    const option = options.find(option => option.name === name);
    return option ? option.price : 0;
};

export const calculateTotalPrice = async (selectedOptions) => {
    let totalPrice = 0;

    if (selectedOptions.exterior) {
        if (typeof selectedOptions.exterior === 'string') {
            totalPrice += await fetchOptionPriceByName('exterior', selectedOptions.exterior);
        } else {
            totalPrice += selectedOptions.exterior.price || 0;
        }
    }
    if (selectedOptions.interior) {
        if (typeof selectedOptions.interior === 'string') {
            totalPrice += await fetchOptionPriceByName('interior', selectedOptions.interior);
        } else {
            totalPrice += selectedOptions.interior.price || 0;
        }
    }
    if (selectedOptions.roof) {
        if (typeof selectedOptions.roof === 'string') {
            totalPrice += await fetchOptionPriceByName('roof', selectedOptions.roof);
        } else {
            totalPrice += selectedOptions.roof.price || 0;
        }
    }
    if (selectedOptions.wheel) {
        if (typeof selectedOptions.wheel === 'string') {
            totalPrice += await fetchOptionPriceByName('wheel', selectedOptions.wheel);
        } else {
            totalPrice += selectedOptions.wheel.price || 0;
        }
    }

    return totalPrice;
};