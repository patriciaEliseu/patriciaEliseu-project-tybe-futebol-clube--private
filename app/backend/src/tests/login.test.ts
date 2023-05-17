import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import {  user } from './mock/loginMock';
import { send } from 'process';
import LoginServices from '../services/LoginServices';
import { Response } from 'superagent';
// import { after, before } from 'node:test';


chai.use(chaiHttp);

const { expect } = chai;


describe('Teste de integração usando createLogin em /login', function()  {
  describe('list token and status 200', function() {
    afterEach(() => {
      sinon.restore();
    });
    })
  it('Should return Token', async function() {
    sinon.stub(UserModel, 'findOne').resolves(user as any) 
    sinon.stub(bcrypt, 'compareSync').returns(true)
    const tockMock = sinon.mock(jwt).expects('sign').returns('token');
    const response = await chai
      .request(app)
      .post('/login').send({ email: 'admin@admin.com',
      password: 'secret_admin'
        });
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ token:'token' });
  });
});
