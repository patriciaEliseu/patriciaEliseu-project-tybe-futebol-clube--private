import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { teamsMock } from './mock/teamsMock';
// import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;


describe('Teste de integração usando getAll em /teams', function()  {
  describe('list all teams and status 200', function() {
    afterEach(() => {
      sinon.restore();
    });
  it('Should return all teams', async function() {
   
   const response = await chai
    .request(app)
    .get('/teams');
   expect(response.status).to.be.equal(200);
   expect(response.body).to.deep.equal(teamsMock);
  });
});
});

describe('Teste de integração usando getById em /teams/:id', function()  {
  describe('list all teams and status 200', function() {
    afterEach(() => {
      sinon.restore();
    });
  it('Should return team id: 2', async function() {
   
   const response = await chai
    .request(app)
    .get('/teams/2');
   expect(response.status).to.be.equal(200);
   expect(response.body).to.deep.equal(teamsMock[1]);
  });
  // it('Should not return team id:120, because does not exist', async function() {
   
  //   const response = await chai
  //    .request(app)
  //    .get('/teams/120');
  //   expect(response.status).to.be.equal(500);
  //   expect(response.body).to.deep.equal({ message: 'Deu errado' });
  //  });
});
});