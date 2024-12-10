import { Association } from './Association';
import { Country } from './Country';
import { ExampleFile } from './ExampleFile';
import { SettingsModel } from './SettingsModel';
import { User } from './User';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationBag {
  @ApiProperty()
  association: Association;
  @ApiProperty()
  adminUser: User;

  @ApiProperty()
  carUser: User;

  @ApiProperty()
  settings: SettingsModel;
  
  @ApiProperty()
  country: Country;

  @ApiProperty()
  exampleFiles: ExampleFile[];
 
}
