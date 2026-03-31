const request = require('supertest');

const baseUrl = 'https://rickandmortyapi.com/api';

const getLocations = () => {
    return request(baseUrl)
        .get('/location')
};

const getLocationByName = (name) => {
    return request(baseUrl)
        .get('/location')
        .query({ name });
};

const getLocationById = (id) => {
    return request(baseUrl)
        .get(`/location/${id}`);
};

module.exports = {
    getLocations,
    getLocationByName,
    getLocationById
};