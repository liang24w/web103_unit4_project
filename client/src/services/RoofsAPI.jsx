const RoofsAPI = {
    getAllRoofs: async () => {
        try {
            const response = await fetch('/api/roofs');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching roofs:', error);
            throw error;
        }
    },
};

export default RoofsAPI;