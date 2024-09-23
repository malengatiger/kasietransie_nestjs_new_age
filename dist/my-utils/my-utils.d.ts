export declare abstract class MyUtils {
    static createQRCodeAndUploadToCloudStorage(arg0: string, arg1: string, arg2: number): void;
    static getDatabaseUrl(): string;
    static getPort(): string;
    static getStartDate(numberOfHours: number): string;
    static formatISOStringDate(dateString: string, locale: string): string;
    static deleteOldFiles(): void;
}
