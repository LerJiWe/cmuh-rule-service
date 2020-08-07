import { ApiConfig, Config } from '@cmuh/api-config';
export declare class HttpPut {
    private config;
    constructor(config: ApiConfig<Config>);
    put(url: string, body: any): Promise<string>;
}
