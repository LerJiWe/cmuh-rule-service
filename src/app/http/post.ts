import { request } from 'http';
import { ApiConfig, Config } from '@cmuh/api-config';

export class HttpPost {

    constructor(private config: ApiConfig<Config>) { }

    public async post(url: string, body: any) {
        
        const hostName = this.config.get('httpConfig');
        
        return new Promise<string>((resolve, reject) => {
            try {
                let options = {
                    ...hostName, port: 3002, path: url, method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                };
                let req = request(options, (res) => {
                    let body = '';
                    res.on('data', (chunk) => { body += chunk; });
                    res.on('end', () => {
                        try {
                            resolve(JSON.parse(body));
                        } catch (error) {
                            console.error(error);
                            reject(error);
                        }
                    });
                });
                req.on('error', (e) => { console.log('problem with request: ' + e.message); });
                const data = JSON.stringify(body);
                req.end(data);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

}