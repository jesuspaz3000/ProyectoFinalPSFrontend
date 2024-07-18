const apiBaseUrl = 'http://localhost:8000';

export const initBTree = async (degree) => {
    try {
        const parsedDegree = Number(degree);
        console.log('Degree received in initBTree:', degree, 'Parsed degree:', parsedDegree);
        if (isNaN(parsedDegree) || parsedDegree < 2) {
            throw new Error('El grado debe ser un número mayor o igual a 2');
        }
        console.log(`Initializing B-Tree with degree: ${parsedDegree}`);
        const response = await fetch(`${apiBaseUrl}/init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ degree: parsedDegree }),
        });

        const data = await response.json();
        console.log('Raw initBTree API response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Error en la inicialización');
        }

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

        if (!response.ok) {
            throw new Error(data.message || 'Error en la inserción');
        }

        return data;
    } catch (error) {
        console.error('Error in insertNumber:', error);
        throw error;
    }
};

export const searchNumber = async (number) => {
    try {
        console.log('Searching for number:', number);
        const response = await fetch(`${apiBaseUrl}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number }),
        });

        const data = await response.json();
        console.log('Search response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Error en la búsqueda');
        }

        return data;
    } catch (error) {
        console.error('Error in searchNumber:', error);
        throw error;
    }
};

export const deleteNumber = async (number) => {
    try {
        console.log('Sending delete request with number:', number);
        const response = await fetch(`${apiBaseUrl}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number }),
        });

        const data = await response.json();
        console.log('Delete response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Error en la eliminación');
        }

        return data;
    } catch (error) {
        console.error('Error in deleteNumber:', error);
        throw error;
    }
};

export const traverseTree = async () => {
    try {
        console.log('Traversing the tree');
        const response = await fetch(`${apiBaseUrl}/traverse`, {
            method: 'GET',
        });

        const data = await response.json();
        console.log('Traverse response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Error en el recorrido');
        }

        return data;
    } catch (error) {
        console.error('Error in traverseTree:', error);
        throw error;
    }
};

export const getTreeStructure = async () => {
    try {
        console.log('Getting tree structure');
        const response = await fetch(`${apiBaseUrl}/get_structure`, {
            method: 'GET',
        });

        const data = await response.json();
        console.log('Get structure response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener la estructura del árbol');
        }

        return data;
    } catch (error) {
        console.error('Error in getTreeStructure:', error);
        throw error;
    }
};