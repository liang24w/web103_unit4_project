export const validateConvertibleOptions = (isConvertible, selectedOptions) => {
    const roofOption = selectedOptions.roof;

    if (isConvertible) {
        if (typeof roofOption === 'string') {
            return roofOption.toLowerCase() === 'Carbon Flash - Nacelles';
        } else if (roofOption && roofOption.name) {
            return roofOption.name.toLowerCase() === 'Carbon Flash - Nacelles';
        }
    }

    return true;
};