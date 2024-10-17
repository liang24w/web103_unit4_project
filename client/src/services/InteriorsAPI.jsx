const InteriorsAPI = {
    getAllInteriors: async () => {
        try {
            const response = await fetch('/api/interiors');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching interiors:', error);
            throw error;
        }
    },
};

export default InteriorsAPI;