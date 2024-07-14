const apiBaseUrl = 'http://192.168.0.195:8000';

export const initBTree = async (degree) => {
    const response = await fetch(`${apiBaseUrl}/init`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ degree }),
    });
    return response.json();
};

export const insertWord = async (word) => {
    const response = await fetch(`${apiBaseUrl}/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    });
    return response.json();
};

export const searchWord = async (word) => {
    const response = await fetch(`${apiBaseUrl}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    });
    return response.json();
};

export const deleteWord = async (word) => {
    const response = await fetch(`${apiBaseUrl}/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    });
    return response.json();
};

export const traverseTree = async () => {
    const response = await fetch(`${apiBaseUrl}/traverse`, {
        method: 'GET',
    });
    return response.json();
};
