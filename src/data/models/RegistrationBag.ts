import { Association } from './Association';
import { Country } from './Country';
import { SettingsModel } from './SettingsModel';
import { User } from './User';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationBag {
  @ApiProperty()
  association: Association;
  @ApiProperty()
  user: User;
  @ApiProperty()
  settings: SettingsModel;
  @ApiProperty()
  country: Country;
  @ApiProperty()
  exampleVehicleFileUrl: string;
  @ApiProperty()
  exampleUserFileUrl: string;
}
