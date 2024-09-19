export declare class RouteAssignment {
    _partitionKey: string;
    _id: string;
    associationId: string;
    routeId: string;
    vehicleId: string;
    active: number;
    created: string;
    routeName: string;
    associationName: string;
    vehicleReg: string;
}
export declare const RouteAssignmentSchema: import("mongoose").Schema<RouteAssignment, import("mongoose").Model<RouteAssignment, any, any, any, import("mongoose").Document<unknown, any, RouteAssignment> & RouteAssignment & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RouteAssignment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RouteAssignment>> & import("mongoose").FlatRecord<RouteAssignment> & Required<{
    _id: string;
}>>;
