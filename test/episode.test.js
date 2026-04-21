const { expect } = require('chai');
const { getEpisodes, getEpisodeByName, getEpisodeById } = require('../services/services.episodeService.js');

describe('Rick and Morty API', () => {
    describe('Episodes', () => {

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

    describe('Filtro de episódios por nome', () => {

        it('Deve retornar 200 ao filtrar episódios pelo nome "Morty"', async () => {
            const response = await getEpisodeByName('Morty');

            expect(response.status).to.equal(200);
            expect(response.body.results).to.be.an('array').that.is.not.empty;

            response.body.results.forEach((episode) => {
                expect(episode).to.have.property('name').that.is.a('string');
                expect(episode.name.toLowerCase()).to.include('morty');
            });

            expect(response.body).to.have.property('info');
        });

        it('Deve retornar 404 ao buscar episódio com nome inexistente', async () => {
            const response = await getEpisodeByName('Nome_666');

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error').that.is.a('string');
        });
    });

    describe('Busca de episódio por ID', () => {

        it('Deve retornar 200 ao buscar episódio por ID válido', async () => {
            const response = await getEpisodeById(5);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id').that.is.a('number');
            expect(response.body.name).to.be.a('string');
            expect(response.body).to.include({
                id: 5,
                name: 'Meeseeks and Destroy'
            });
            expect(response.body).to.have.property('air_date').that.is.a('string');
            expect(response.body).to.have.property('episode').that.is.a('string');
            expect(response.body).to.have.property('characters').that.is.an('array');
        });

        it('Deve retornar 404 ao buscar episódio com ID inexistente', async () => {
            const response = await getEpisodeById(99999);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error').that.is.a('string')
        });
    });
});