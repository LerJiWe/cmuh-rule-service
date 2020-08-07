"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpGet = void 0;
const https_1 = require("https");
class HttpGet {
    constructor(config) {
        this.config = config;
    }
    get(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // const hostName = this.config.get('httpConfig');
            const hostName = { hostname: 'his-test.cmuh.org.tw' };
            return new Promise((resolve, reject) => {
                try {
                    let options = Object.assign(Object.assign({}, hostName), { path: url, method: 'GET' });
                    let req = https_1.request(options, (res) => {
                        let body = '';
                        res.on('data', (chunk) => { body += chunk; });
                        res.on('end', () => {
                            try {
                                resolve(JSON.parse(body));
                            }
                            catch (error) {
                                console.error(error);
                                reject(error);
                            }
                        });
                    });
                    req.on('error', (e) => { console.log('problem with request: ' + e.message); });
                    const data = JSON.stringify(body);
                    req.end(data);
                }
                catch (error) {
                    console.error(error);
                    reject(error);
                }
            });
        });
    }
}
exports.HttpGet = HttpGet;
//# sourceMappingURL=get.js.map