const request = require('supertest');

const baseUrl = 'https://rickandmortyapi.com/api';

const getEpisodes = () => {
    return request(baseUrl)
        .get('/episode')
};

const getEpisodeByName = (name) => {
    return request(baseUrl)
        .get('/episode')
        .query({ name })
};

const getEpisodeById = (id) => {
    return request(baseUrl)
        .get(`/episode/${id}`)
};

module.exports = {
    getEpisodes,
    getEpisodeByName,
    getEpisodeById
};