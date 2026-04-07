const { expect } = require('chai');
const { getEpisodes, getEpisodeByName, getEpisodeById } = require('../services/services.episodeService.js');

describe('Rick and Morty API', () => {
    describe('Listagem de Episodes', () => {

        it('Deve retornar status 200 e validar estrutura dos episodes da página 1', async () => {
            const response = await getEpisodes()

            expect(response.status).to.equal(200);

            expect(response.body).to.have.property('info');
            expect(response.body).to.have.property('results');

            expect(response.body.results).to.be.an('array').that.is.not.empty;

            response.body.results.forEach((episode) => {
                expect(episode).to.have.property('id').to.be.a('number');
                expect(episode).to.have.property('name').to.be.a('string');
                expect(episode).to.have.property('air_date').to.be.a('string');
                expect(episode).to.have.property('episode').to.be.a('string');
                expect(episode).to.have.property('characters').to.be.an('array').that.is.not.empty;
                expect(episode).to.have.property('url').to.be.a('string');
                expect(episode).to.have.property('created').to.be.a('string');
            });

            expect(response.body.info).to.have.property('count').to.be.a('number');
            expect(response.body.info).to.have.property('pages').to.be.a('number');
            expect(response.body.info).to.have.property('next').to.be.a('string');
            expect(response.body.info).to.have.property('prev');
        });
    });

    describe('Filtros de Episode por nome', () => {

        it('Deve retornar episode filtrado pelo nome "Morty"', async () => {
            const response = await getEpisodeByName('Morty');

            expect(response.status).to.equal(200);
            expect(response.body.results).to.be.an('array').that.is.not.empty;

            response.body.results.forEach((episode) => {
                expect(episode).to.have.property('name').that.is.a('string');
                expect(episode.name.toLowerCase()).to.include('morty');
            });

            expect(response.body).to.have.property('info');
        });

        it('Deve retornar erro ao buscar episode com nome inexistente', async () => {
            const response = await getEpisodeByName('Nome_666');

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error').that.is.a('string');
        });
    });

    describe('Busca de Episode por ID', () => {

        it('Deve retornar um episode válido ao buscar por ID', async () => {
            const response = await getEpisodeById(5);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id').that.is.a('number');
            expect(response.body.name).to.be.a('string');
            expect(response.body.id).to.equal(5);
            expect(response.body).to.have.property('air_date').that.is.a('string');
            expect(response.body).to.have.property('episode').that.is.a('string'); 
            expect(response.body.characters).to.be.an('array');        
        });

        it('Deve retornar 404 para episode inexistente', async () => {
            const response = await getEpisodeById(99999);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error').that.is.a('string')
        });
    });
});