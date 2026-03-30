const { expect } = require('chai');
const { getCharacters, getCharacterByName, getCharacterById } = require('../services/services.characterService.js');

describe('Rick and Morty API', () => {
    describe('Listagem de personagens', () => {

        it('Deve retornar 200 e validar estrutura dos personagens da página 1', async () => {
            const response = await getCharacters();

            expect(response.status).to.equal(200);

            expect(response.body).to.have.property('info');
            expect(response.body).to.have.property('results');
            
            expect(response.body.results).to.be.an('array').that.is.not.empty;
            
            response.body.results.forEach((character) => {
                expect(character).to.have.property('id').to.be.a('number');
                expect(character).to.have.property('name').to.be.a('string');
                expect(character).to.have.property('status').to.be.a('string');
                expect(character).to.have.property('species').to.be.a('string');
                expect(character).to.have.property('gender').to.be.a('string');
            });
        });
    });

    describe('Teste de personagens', () => {
        it('Deve retornar 200 e filtrar personagens pelo nome "Rick" ', async () => {
            const response = await getCharacterByName('Rick')

            expect(response.status).to.equal(200);
            expect(response.body.results).to.be.an('array').that.is.not.empty;
            
            response.body.results.forEach((character) => {
                expect(character).to.have.property('name').that.is.a('string');
                expect(character.name.toLowerCase()).to.include('rick');
            });
        });
    });

    describe('Teste de personagem por id', () => {
        it('Deve retornar 200 e buscar personagem por ID', async () => {
            const response = await getCharacterById(2);

            expect(response.status).to.equal(200);
            expect(response.body.id).to.be.a('number');
            expect(response.body.name).to.be.a('string');
            expect(response.body).to.have.property('id', 2);
            expect(response.body).to.have.property('name', 'Morty Smith');
        });

        it('Deve retornar 404 para personagem inexistente', async () => {
            const response = await getCharacterById(999999);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error')
        });
    });
});