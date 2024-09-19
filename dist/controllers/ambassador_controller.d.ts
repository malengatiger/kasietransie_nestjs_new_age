import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { AmbassadorService } from 'src/services/AmbassadorService';
export declare class AmbassadorController {
    private readonly ambassadorService;
    constructor(ambassadorService: AmbassadorService);
    addAmbassadorPassengerCount(count: AmbassadorPassengerCount): Promise<AmbassadorPassengerCount>;
    getUserAmbassadorPassengerCounts(query: {
        userId: string;
        startDate: string;
    }): Promise<AmbassadorPassengerCount[]>;
    getVehicleAmbassadorPassengerCounts(query: {
        vehicleId: string;
        startSate: string;
    }): Promise<AmbassadorPassengerCount[]>;
}
