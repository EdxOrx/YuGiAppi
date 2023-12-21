import { isEmpty } from 'rambda';
import responseMock from './responseMock.json';
import { IYuGiOhCard, IYuGiOhResponse, IParams } from '../@types/types';

const fetchApi = async (api: URL) => {
    const response = await fetch(api);
    return await response.json();
}

const buildParams = (params: IParams): string => {
    let paramsStr:string = '',
        paramsLength:number = Object.keys(params).length;

    for(let i = 0 ; i < paramsLength ; i++) {
        let key = Object.keys(params)[i],
            value = Object.values(params)[i];

        paramsStr += `${i === 0 ? '?' : '&'}${key}=${value}`;
    }

    return paramsStr;
}

const parse = (response: IYuGiOhResponse) : Array<IYuGiOhCard> => {
    return response?.data;
}

const getData = async (params?: IParams) => {
    let API_STR: string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    if (!isEmpty(params)) {
        API_STR += buildParams(params || {});
    }

    return parse(responseMock);
    // return fetchApi(new URL(API_STR));
}

export default getData;
