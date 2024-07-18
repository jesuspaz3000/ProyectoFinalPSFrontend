const apiBaseUrl = 'http://192.168.0.167:8000';

export const initBTree = async (degree) => {
    try {
        const response = await fetch(`${apiBaseUrl}/init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ degree }),
        });
        const data = await response.json();
        console.log('Raw initBTree API response:', data);
        return data;
    } catch (error) {
        console.error('Error in initBTree:', error);
        throw error;
    }
};

export const insertNumber = async (number) => {
    try {
        console.log('Sending insert request with number:', number);
        const response = await fetch(`${apiBaseUrl}/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number }),
        });
        const data = await response.json();
        console.log('Insert response:', data);
        return data;
    } catch (error) {
        console.error('Error in insertNumber:', error);
        throw error;
    }
};

export const searchNumber = async (number) => {
    try {
        const response = await fetch(`${apiBaseUrl}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number }),
        });
        return response.json();
    } catch (error) {
        console.error('Error in searchNumber:', error);
        throw error;
    }
};

export const deleteNumber = async (number) => {
    try {
      console.log('Enviando solicitud de eliminación para el número:', number);
      const response = await fetch(`${apiBaseUrl}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number }),
      });
      const data = await response.json();
      console.log('Respuesta de eliminación:', data);
      if (!response.ok) {
        throw new Error(data.message || 'Error en la eliminación');
      }
      return data;
    } catch (error) {
      console.error('Error en deleteNumber:', error);
      return { message: error.message };
    }
  };

export const traverseTree = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/traverse`, {
            method: 'GET',
        });
        return response.json();
    } catch (error) {
        console.error('Error in traverseTree:', error);
        throw error;
    }
};

export const getTreeStructure = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/get_structure`, {
            method: 'GET',
        });
        return response.json();
    } catch (error) {
        console.error('Error in getTreeStructure:', error);
        throw error;
    }
};