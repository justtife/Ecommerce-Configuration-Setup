export default interface OutputResponse {
    message: string;
    data?: object | string | string[];
    statusCode?: number;
    code?: number;
    token?: string;
    status?: "success" | "failed" | "pending";
}
