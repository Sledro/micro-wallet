import request from 'supertest';
import App from '../app';
import { AddressController } from '../controllers/address.controller';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

// [POST] /address/segwit

describe('Testing Address', () => {
  describe('[POST] /address/multisig', () => {
    it('test happy path - responds with expected address', () => {
      const app = new App([AddressController]);

      const data: object = {
        seed: '414583e964a2cf7473c44942712381a8e08817115488c9138b6eebe04030b8f000accafe893a6af8782d3f9612cb8c0d6ff893b6208f5a050a841b2fcb840faf',
        path: `m/44'/0'/0'/0/0`,
      };

      return request(app.getServer()).post(`/address/segwit`).send(data).expect(200, { address: 'bc1qz9nt2zw2y56aajjfzpg08hapcn342dvv40ferd' });
    });

    it('returns an error as seed is < 128 characters', () => {
      const app = new App([AddressController]);

      const data: object = {
        seed: '414583e964a2cf7473c4494',
        path: `m/44'/0'/0'/0/0`,
      };

      return request(app.getServer())
        .post(`/address/segwit`)
        .send(data)
        .expect(400, { message: `seed must be longer than or equal to 128 characters` });
    });

    it('returns an error as seed is > 512 characters', () => {
      const app = new App([AddressController]);

      const data: object = {
        seed: '414583e964a2cf74'.padEnd(1000, '414583e964a2cf74'),
        path: `m/44'/0'/0'/0/0`,
      };

      return request(app.getServer())
        .post(`/address/segwit`)
        .send(data)
        .expect(400, { message: `seed must be shorter than or equal to 512 characters` });
    });

    it('returns an error as seed is not hex', () => {
      const app = new App([AddressController]);

      const data: object = {
        seed: 'ZZZZZASDASDASD414583e964a2cf7473c44942712381a8e08817115488c9138b6eebe04030b8f000accafe893a6af8782d3f9612cb8c0d6f2134412312311232',
        path: `m/44'/0'/0'/0/0`,
      };

      return request(app.getServer()).post(`/address/segwit`).send(data).expect(400, { message: `seed must be a hexadecimal number` });
    });

    it('returns an error as seed is empty', () => {
      const app = new App([AddressController]);

      const data: object = {
        seed: '',
        path: `m/44'/0'/0'/0/0`,
      };

      return request(app.getServer())
        .post(`/address/segwit`)
        .send(data)
        .expect(400, { message: `seed must be longer than or equal to 128 characters,seed must be a hexadecimal number,seed should not be empty` });
    });

    it('returns an error as path is not correct format', () => {
      const app = new App([AddressController]);

      const data: object = {
        seed: '414583e964a2cf7473c44942712381a8e08817115488c9138b6eebe04030b8f000accafe893a6af8782d3f9612cb8c0d6ff893b6208f5a050a841b2fcb840faf',
        path: `s/44'/0'/0'/0/0`,
      };

      return request(app.getServer())
        .post(`/address/segwit`)
        .send(data)
        .expect(400, { message: `Derivation path must be in the format of BIP32Path eg. m/44'/0'/0'/0/0` });
    });

    it('returns an error as path is empty', () => {
      const app = new App([AddressController]);

      const data: object = {
        seed: '414583e964a2cf7473c44942712381a8e08817115488c9138b6eebe04030b8f000accafe893a6af8782d3f9612cb8c0d6ff893b6208f5a050a841b2fcb840faf',
        path: '',
      };

      return request(app.getServer())
        .post(`/address/segwit`)
        .send(data)
        .expect(400, { message: `Derivation path must be in the format of BIP32Path eg. m/44'/0'/0'/0/0,path should not be empty` });
    });

    it('returns multiple validation errors', () => {
      const app = new App([AddressController]);

      const data: object = {};

      return request(app.getServer()).post(`/address/segwit`).send(data).expect(400, {
        message: `seed must be longer than or equal to 128 characters,seed must be a hexadecimal number,seed should not be empty,seed must be a string, Derivation path must be in the format of BIP32Path eg. m/44'/0'/0'/0/0,path should not be empty,path must be a string`,
      });
    });
  });
});

// [POST] /address/multisig

describe('Testing MultiSig Address', () => {
  describe('[POST] /address/multisig', () => {
    it('test happy path - responds with expected address', () => {
      const app = new App([AddressController]);

      const data: object = {
        n: 2,
        m: 3,
        publicKeys: [
          '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
          '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
          '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
        ],
      };

      return request(app.getServer()).post(`/address/multisig`).send(data).expect(200, { address: '36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7' });
    });

    it('returns an error as n value is empty', () => {
      const app = new App([AddressController]);

      const data: object = {
        n: '',
        m: 3,
        publicKeys: [
          '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
          '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
          '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
        ],
      };

      return request(app.getServer())
        .post(`/address/multisig`)
        .send(data)
        .expect(400, { message: 'n must be a positive number,n must be a number conforming to the specified constraints' });
    });

    it('returns an error as m value is empty', () => {
      const app = new App([AddressController]);

      const data: object = {
        n: 2,
        m: '',
        publicKeys: [
          '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
          '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
          '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
        ],
      };

      return request(app.getServer())
        .post(`/address/multisig`)
        .send(data)
        .expect(400, { message: 'm must be a positive number,m must be a number conforming to the specified constraints' });
    });

    it('returns an error as publicKeys is passed in as string instead of array of strings', () => {
      const app = new App([AddressController]);

      const data: object = {
        n: 2,
        m: 3,
        publicKeys: "",
      };

      return request(app.getServer())
        .post(`/address/multisig`)
        .send(data)
        .expect(400, { message: 'each value in publicKeys must be a hexadecimal number,publicKeys must be an array,publicKeys should not be empty' });
    });

  });
});
