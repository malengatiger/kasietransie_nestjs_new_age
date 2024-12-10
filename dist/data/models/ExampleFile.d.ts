export declare class ExampleFile {
    type: string;
    fileName: string;
    downloadUrl: string;
    bucketFileName: string;
}
export declare const ExampleFileSchema: import("mongoose").Schema<ExampleFile, import("mongoose").Model<ExampleFile, any, any, any, import("mongoose").Document<unknown, any, ExampleFile> & ExampleFile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ExampleFile, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ExampleFile>> & import("mongoose").FlatRecord<ExampleFile> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
