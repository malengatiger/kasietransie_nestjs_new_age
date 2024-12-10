export declare class TranslationBag {
    _partitionKey: string;
    _id: string;
    stringToTranslate: string;
    translatedString: string;
    source: string;
    target: string;
    format: string;
    translatedText: string;
    key: string;
    created: string;
}
export declare const TranslationBagSchema: import("mongoose").Schema<TranslationBag, import("mongoose").Model<TranslationBag, any, any, any, import("mongoose").Document<unknown, any, TranslationBag> & TranslationBag & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TranslationBag, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TranslationBag>> & import("mongoose").FlatRecord<TranslationBag> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
