import { IsNumber, IsString, IsPositive, IsNotEmpty, IsHexadecimal, Matches, Length, IsArray } from 'class-validator';

// Request used to create HD SegWit Address
export class GenerateHDSegWitAddressDto {
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  @Length(128, 512)
  // Seed used to generate address
  public seed: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^m\/\d\d\'\/\d'\/\d'\/\d\/\d$/, {
    message: `Derivation path must be in the format of BIP32Path eg. m/44'/0'/0'/0/0`,
  })
  // Derivation path
  public path: string;
}

// Request used to create P2SH Address
export class GenerateP2SHAddressDto {
  @IsNumber()
  @IsPositive()
  // N to indicate how many public keys there are
  public n: number;

  @IsNumber()
  @IsPositive()
  // M to indicate how many signatures are required
  public m: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsHexadecimal({ each: true })
  // Addresses array of bitcoin addresses
  public publicKeys: Array<string>;
}
