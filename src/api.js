// src/api.js
const API_URL = 'http://localhost:8000';

export const insertWord = async (word) => {
    const response = await fetch(`${API_URL}/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    });
    return response.json();
};

export const searchWord = async (word) => {
    const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    });
    return response.json();
};

export const deleteWord = async (word) => {
    const response = await fetch(`${API_URL}/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    });
    return response.json();
};

export const traverseTree = async () => {
    const response = await fetch(`${API_URL}/traverse`);
    return response.json();
};
