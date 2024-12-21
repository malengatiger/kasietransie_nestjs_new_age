import { CommuterService } from './commuter.service';
import { Commuter } from 'src/data/models/Commuter';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
export declare class CommuterController {
    private readonly commuterService;
    constructor(commuterService: CommuterService);
    addCommuter(commuter: Commuter): Promise<any>;
    updateCommuter(commuter: Commuter): Promise<any>;
    addCommuterRequest(commuterRequest: CommuterRequest): Promise<CommuterRequest>;
    cancelCommuterRequest(commuterRequest: CommuterRequest): Promise<any>;
}
