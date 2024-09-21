import { Association } from './Association';
import { Country } from './Country';
import { SettingsModel } from './SettingsModel';
import { User } from './User';
export declare class RegistrationBag {
    association: Association;
    user: User;
    settings: SettingsModel;
    country: Country;
    exampleVehicleFileUrl: string;
    exampleUserFileUrl: string;
}
