export declare class AssociationToken {
    _partitionKey: string;
    _id: string;
    userId: string;
    token: string;
    created: string;
    associationId: string;
    associationName: string;
}
export declare const AssociationTokenSchema: import("mongoose").Schema<AssociationToken, import("mongoose").Model<AssociationToken, any, any, any, import("mongoose").Document<unknown, any, AssociationToken> & AssociationToken & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AssociationToken, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AssociationToken>> & import("mongoose").FlatRecord<AssociationToken> & Required<{
    _id: string;
}>>;
