export declare class User {
    _partitionKey: string;
    _id: string;
    userType: string;
    userId: string;
    firstName: string;
    lastName: string;
    gender: string;
    countryId: string;
    associationId: string;
    associationName: string;
    fcmToken: string;
    email: string;
    cellphone: string;
    password: string;
    countryName: string;
    dateRegistered: string;
    qrCodeUrl: string;
    bucketFileName: string;
    profileUrl: string;
    profileThumbnail: string;
    qrCodeBytes: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
