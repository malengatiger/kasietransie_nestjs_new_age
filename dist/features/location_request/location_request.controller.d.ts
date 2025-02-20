import { LocationRequestService } from './location_request.service';
import { LocationRequest } from 'src/data/models/LocationRequest';
import { LocationResponse } from 'src/data/models/LocationResponse';
import { LocationResponseError } from 'src/data/models/LocationResponseError';
export declare class LocationRequestController {
    private readonly locationRequestService;
    constructor(locationRequestService: LocationRequestService);
    addLocationRequest(locationRequest: LocationRequest): Promise<any>;
    addLocationResponse(locationResponse: LocationResponse): Promise<any>;
    addLocationResponseError(locationResponseError: LocationResponseError): Promise<any>;
}
