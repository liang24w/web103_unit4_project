const ExteriorsAPI = {
    getAllExteriors: async () => {
        try {
            const response = await fetch('/api/exteriors');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching exteriors:', error);
            throw error;
        }
    },
};

export default ExteriorsAPI;