import request from 'supertest';
import App from '../app';
import { AddressController } from '../controllers/address.controller';
import { GenerateP2SHAddressDto, GenerateHDSegWitAddressDto } from '../dtos/address.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Address', () => {
  describe('[POST] /address/segwit', () => {
    it('test happy path', () => {
      const app = new App([AddressController]);
      
      const generateHDSegWitAddresData: GenerateHDSegWitAddressDto = {
        seed: "414583e964a2cf7473c44942712381a8e08817115488c9138b6eebe04030b8f000accafe893a6af8782d3f9612cb8c0d6ff893b6208f5a050a841b2fcb840faf",
        path: "m/44'/0'/0'/0/0"
      };

      return request(app.getServer()).post(`/address/segwit`).send(generateHDSegWitAddresData).expect(200, { address: 'bc1qz9nt2zw2y56aajjfzpg08hapcn342dvv40ferd' });
    });
  });

  describe('[POST] /address/segwit', () => {
    it('response statusCode 200', () => {
      const app = new App([AddressController]);
      
      const generateHDSegWitAddresData: GenerateHDSegWitAddressDto = {
        seed: "",
        path: ""
      };

      return request(app.getServer()).post(`/address/segwit`).send(generateHDSegWitAddresData).expect(200);
    });
  });
});

// A typical P2SH address looks like 347N1Thc213QqfYCz3PZkjoJpNv5b14kBd. A P2SH address always begins with a '3', instead of a '1' as in P2PKH addresses.
