import * as bitcoin from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import { GenerateP2SHAddressDto, GenerateHDSegWitAddressDto } from '@/dtos/address.dto';
import { Address } from '@interfaces/address.interface';

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
    const generateHDSegWitAddressData: Address = { address: address};
    return generateHDSegWitAddressData;
  }

  /**
   * Returns a n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and can be specified.
   * @param reqData - GenerateP2SHAddressDto
   * @returns Address interface
   */
  public async generateP2SHAddress(reqData: GenerateP2SHAddressDto): Promise<Address> {
    const publicKeysBuffer: Buffer[] = reqData.publicKeys.map(hex => Buffer.from(hex, 'hex'));
    // P2SH, pay-to-multisig (n-of-m) address
    const { address } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2ms({ m: reqData.m, pubkeys: publicKeysBuffer }),
    });
    const generateP2SHAddressData: Address = { address: address};
    return generateP2SHAddressData;
  }
}

export default AddressService;
