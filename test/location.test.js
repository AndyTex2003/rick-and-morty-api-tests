const { expect } = require('chai');
const { getLocations, getLocationByName, getLocationById } = require('../services/services.locationService.js');

describe('Rick and Morty API', () => {
    describe('Location', () => {

        it('Deve retornar 200 e validar estrutura da lista de episódios', async () => {
            const response = await getLocations();

            expect(response.status).to.equal(200);

            expect(response.body).to.have.property('info');
            expect(response.body).to.have.property('results');

            expect(response.body.results).to.be.an('array').that.is.not.empty;

            response.body.results.forEach((location) => {
                expect(location).to.have.property('id').to.be.a('number');
                expect(location).to.have.property('name').to.be.a('string');
                expect(location).to.have.property('type').to.be.a('string');
                expect(location).to.have.property('dimension').to.be.a('string');
                expect(location).to.have.property('residents').to.be.an('array');
                expect(location).to.have.property('url').to.be.a('string');
                expect(location).to.have.property('created').to.be.a('string');
            });

            expect(response.body.info).to.have.property('count').to.be.a('number');
            expect(response.body.info).to.have.property('pages').to.be.a('number');
            expect(response.body.info).to.have.property('next');
            expect(response.body.info).to.have.property('prev');

        });

    });

    describe('Filtros de localização por nome', () => {

        it('Deve retornar 200 ao filtrar localizações pelo nome "Earth"', async () => {
            const response = await getLocationByName('Earth');

            expect(response.status).to.equal(200);
            expect(response.body.results).to.be.an('array').that.is.not.empty;

            response.body.results.forEach((location) => {
                expect(location).to.have.property('name').that.is.a('string');
                expect(location.name.toLowerCase()).to.include('earth');
            });

            expect(response.body).to.have.property('info');
        });

        it('Deve retornar 404 ao buscar localização com nome inexistente', async () => {
            const response = await getLocationByName('Nome_12345');

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error').that.is.a('string');
        });
    });

    describe('Busca de localização por ID', () => {

        it('Deve retornar 200 ao buscar localização por ID válido', async () => {
            const response = await getLocationById(3)

            expect(response.status).to.equal(200);
            expect(response.body).to.include({
                id: 3,
                name: 'Citadel of Ricks'
            });

            expect(response.body).to.have.property('type').that.is.a('string');
            expect(response.body).to.have.property('dimension').that.is.a('string');
        });

        it('Deve retornar 404 ao buscar localização com ID inexistente', async () => {
            const response = await getLocationById(999999);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error').that.is.a('string');
        });
    });
});