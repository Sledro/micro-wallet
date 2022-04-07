import { Controller, Post, Body, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import addressService from '@/services/address.service';
import { GenerateP2SHAddressDto, GenerateHDSegWitAddressDto } from '@/dtos/address.dto';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { Address } from '@interfaces/address.interface';

@Controller()
export class AddressController {
  public addressService = new addressService();

  @Post('/address/segwit')
  @OpenAPI({
    summary: 'Generate a HD SegWit address.',
    description: 'Returns a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path.',
  })
  @UseBefore(validationMiddleware(GenerateHDSegWitAddressDto, 'body'))
  async generateSegWitAddress(@Body() reqData: GenerateHDSegWitAddressDto) {
    const response: Address = await this.addressService.generateHDSegWitAddress(reqData);
    return response;
  }

  @Post('/address/multisig')
  @OpenAPI({
    summary: 'Generate a multi-sig address.',
    description: 'Returns a n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and can be specified.',
  })
  @UseBefore(validationMiddleware(GenerateP2SHAddressDto, 'body'))
  async generateP2SHAddress(@Body() reqData: GenerateP2SHAddressDto) {
    const response: Address = await this.addressService.generateP2SHAddress(reqData);
    return response;
  }
}
