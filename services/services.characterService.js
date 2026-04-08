const request = require('supertest');

const { baseUrl } = require('../config/config.js')

const getCharacters = () => {
    return request(baseUrl)
        .get('/character')
};

const getCharacterByName = (name) => {
    return request(baseUrl)
        .get('/character')
        .query({ name });
};

const getCharacterById = (id) => {
    return request(baseUrl)
        .get(`/character/${id}`);
};
    

module.exports = {
    getCharacters,
    getCharacterByName,
    getCharacterById,
};