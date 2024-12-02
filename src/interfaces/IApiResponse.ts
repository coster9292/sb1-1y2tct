export interface IApiResponse {
    success: boolean;
    count?: number;
    msg?: string;
    data?: any;
    error?: string;
}