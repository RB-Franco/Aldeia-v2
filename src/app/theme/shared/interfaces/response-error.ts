export class ResponseError {
	statusCode?: number;
	erros: ResponseErrorMessage[];
}

export interface ResponseErrorMessage {
	error?: string;
	message?: string;
	developerMessage?: string;
}
