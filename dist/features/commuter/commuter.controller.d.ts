import { CommuterService } from './commuter.service';
import { Commuter } from 'src/data/models/Commuter';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { CommuterPickup } from 'src/data/models/CommuterPickup';
export declare class CommuterController {
    private readonly commuterService;
    constructor(commuterService: CommuterService);
    addCommuter(commuter: Commuter): Promise<any>;
    updateCommuter(commuter: Commuter): Promise<any>;
    addCommuterRequest(commuterRequest: CommuterRequest): Promise<CommuterRequest>;
    addCommuterPickUp(commuterPickUp: CommuterPickup): Promise<CommuterPickup>;
    cancelCommuterRequest(commuterRequest: CommuterRequest): Promise<any>;
    getRouteCommuterRequests(routeId: string, startDate: string): Promise<CommuterRequest[]>;
    getCommuterRequests(commuterId: string, startDate: string): Promise<CommuterRequest[]>;
    getAssociationCommuterRequests(associationId: string, startDate: string): Promise<CommuterRequest[]>;
}
