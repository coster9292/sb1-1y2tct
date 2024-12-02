import { IApiResponse, IModel } from '../interfaces';
import { HTTPClientBroFetch } from '@mikosoft/httpclient-bro';


export async function fetchModels(make_id: number): Promise<IModel[]> {
    const opts = {
        encodeURI: false,
        timeout: 8000,
        responseType: '', // 'blob' for file download (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)
        retry: 3,
        retryDelay: 5500,
        maxRedirects: 3,
        headers: {
            authorization: '',
            accept: '*/*' // 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
        }
    };
    const httpClientBro = new HTTPClientBroFetch(opts);
    const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3138' : 'https://api.autoyard.eu';
    const answer = await httpClientBro.askJSON(`${API_BASE_URL}/sys/models?make_id=${make_id}`);
    if (!answer) { return []; }
    const apiResponse: IApiResponse = answer.res.content;
    return apiResponse.data;
}