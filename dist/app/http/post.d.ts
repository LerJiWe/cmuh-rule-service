import { ApiConfig, Config } from '@cmuh/api-config';
export declare class HttpPost {
    private config;
    constructor(config: ApiConfig<Config>);
    post(url: string, body: any): Promise<string>;
}
