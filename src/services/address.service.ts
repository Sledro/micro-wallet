import * as bitcoin from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import { GenerateP2SHAddressDto, GenerateHDSegWitAddressDto } from '@/dtos/address.dto';
import { Address } from '@interfaces/address.interface';
import { HttpException } from '@exceptions/HttpException';

class AddressService {
  /**
   * Returns a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path.
   * @param reqData - GenerateHDSegWitAddressDto
   * @returns Address interface
   */
  public async generateHDSegWitAddress(reqData: GenerateHDSegWitAddressDto): Promise<Address> {
    const seedBuffer = Buffer.from(reqData.seed, 'hex');
    const root = bip32.fromSeed(seedBuffer);
    const child = root.derivePath(reqData.path);
    // Pay To Witness Public Key Hash
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: child.publicKey,
    });
    const generateHDSegWitAddressData: Address = { address: address };
    return generateHDSegWitAddressData;
  }

  /**
   * Returns a n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and can be specified.
   * @param reqData - GenerateP2SHAddressDto
   * @returns Address interface
   */
  public async generateP2SHAddress(reqData: GenerateP2SHAddressDto): Promise<Address> {
    if (reqData.publicKeys.length != reqData.m) {
      throw new HttpException(400, 'm must be the same value as the number of provided keys');
    }
    if (reqData.n > reqData.m) {
      throw new HttpException(400, 'n must be less than or equal to m');
    }
    const publicKeysBuffer: Buffer[] = reqData.publicKeys.map(hex => Buffer.from(hex, 'hex'));
    // P2SH, pay-to-multisig (n-of-m) address
    const { address } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2ms({ m: reqData.n, pubkeys: publicKeysBuffer }),
    });
    const generateP2SHAddressData: Address = { address: address };
    return generateP2SHAddressData;
  }
}

export default AddressService;
