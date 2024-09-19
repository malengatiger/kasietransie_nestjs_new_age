export declare abstract class MyUtils {
    static getDatabaseUrl(): string;
    static getPort(): string;
    static getStartDate(numberOfHours: number): string;
    static createQRCodeAndUploadToCloudStorage(input: string, prefix: string, size: number): Promise<string>;
    static formatISOStringDate(dateString: string, locale: string): string;
    static deleteOldFiles(): void;
}
