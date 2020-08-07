import { request } from 'http';
import { ApiConfig, Config } from '@cmuh/api-config';

export class HttpPut {

    constructor(private config: ApiConfig<Config>) { }

    public async put(url: string, body: any) {

        // const hostName = this.config.get('httpConfig');
        const hostName = {hostname: 'his-test.cmuh.org.tw'};
        return new Promise<string>((resolve, reject) => {
            try {
                let options = {
                    ...hostName, path: url, method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
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