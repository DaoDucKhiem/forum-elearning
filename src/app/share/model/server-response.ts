export class ServerResponse {
    validateInfo: any;
    success: boolean;
    code: string;
    subCode: number;
    userMessage: string;
    systemMessage: string;
    data: any;
    serverTime?: Date;
}