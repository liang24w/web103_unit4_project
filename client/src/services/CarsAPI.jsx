const CarsAPI = {
  getAllCars: async () => {
      try {
          const response = await fetch('/api/cars');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching cars:', error);
          throw error;
      }
  },

  getCarById: async (id) => {
      try {
          const response = await fetch(`/api/cars/${id}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error(`Error fetching car with ID ${id}:`, error);
          throw error;
      }
  },

  createCar: async (car) => {
      try {
          console.log('loggin car inside CarsAPI.createCar: ', car)
          const response = await fetch('/api/cars', { //error seems to be here 
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(car),
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error creating car:', error);
          throw error;
      }
  },

  updateCar: async (id, car) => {
      try {
          const response = await fetch(`/api/cars/${id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(car),
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error(`Error updating car with ID ${id}:`, error);
          throw error;
      }
  },

  deleteCar: async (id) => {
      try {
          const response = await fetch(`/api/cars/${id}`, {
              method: 'DELETE',
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return true;
      } catch (error) {
          console.error(`Error deleting car with ID ${id}:`, error);
          throw error;
      }
  },
};

export default CarsAPI;