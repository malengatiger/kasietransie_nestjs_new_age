import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { Vehicle } from 'src/data/models/Vehicle';
import { Route } from 'src/data/models/Route';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { GenerationRequest } from 'src/data/helpers/GenerationRequest';
export declare class DispatchAsyncHelperService {
    private configService;
    private vehicleModel;
    private routeModel;
    constructor(configService: ConfigService, vehicleModel: mongoose.Model<Vehicle>, routeModel: mongoose.Model<Route>);
    lambda$generateRouteDispatchRecordsInParallel$0(arg0: Route, arg1: Vehicle, arg2: [], arg3: [], arg4: GenerationRequest): Promise<void>;
    generateRouteDispatchRecordsInParallel(request: GenerationRequest): Promise<void>;
    generateCommuterRequestsInParallel(associationId: string): Promise<CommuterRequest[]>;
}
