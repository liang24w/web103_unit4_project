const WheelsAPI = {
    getAllWheels: async () => {
        try {
            const response = await fetch('/api/wheels');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching wheels:', error);
            throw error;
        }
    },
};

export default WheelsAPI;