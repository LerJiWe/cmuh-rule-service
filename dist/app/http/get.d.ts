import { ApiConfig, Config } from '@cmuh/api-config';
export declare class HttpGet {
    private config;
    constructor(config: ApiConfig<Config>);
    get(url: string, body: any): Promise<string>;
}
