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
exports.FactServiceSet = void 0;
// import * as ServiceSet from '@cmuh-model/fact-service';
const ServiceSet = require("./index");
//測試
//測試
class FactServiceSet {
    // private static factPool: Map<string, Fact> = new Map<string, Fact>();
    constructor(config) {
        this.config = config;
        this.serviceSet = ServiceSet;
        this.serviceNames = Object.getOwnPropertyNames(ServiceSet);
        this.config = config;
    }
    /**
     * 輔助抓到並且 new 出 service class 的實體
     * @param serviceName
     */
    getServiceClass(serviceName) {
        serviceName = this.serviceNames.includes(serviceName) ? serviceName : 'Undefined';
        if (FactServiceSet.servicePool.has(serviceName)) {
            return FactServiceSet.servicePool.get(serviceName);
        }
        const serviceClass = new this.serviceSet[serviceName](this.config);
        FactServiceSet.servicePool.set(serviceName, serviceClass);
        return serviceClass;
    }
    /**
     * 直接抓 fact的值給 runtimeFact
     * @param factPath
     * @param factVariable
     * @param inputParams
     */
    getFactValue(factPath, factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            // const fact = FactService.factPool.get(factName);
            const tempClass = this.getServiceClass(factPath.serviceName);
            return yield tempClass[factPath.functionName](factVariable, inputParams);
        });
    }
    /**
     * 為了給 dynamic fact 回傳對應的 抓值function
     * @param factPath
     * @param params
     * @param almanac
     */
    getFactFunction(factPath, params, almanac) {
        return __awaiter(this, void 0, void 0, function* () {
            // const fact = FactService.factPool.get(factName);
            const tempClass = yield this.getServiceClass(factPath.serviceName);
            return tempClass[factPath.functionName](params, almanac);
        });
    }
}
exports.FactServiceSet = FactServiceSet;
FactServiceSet.servicePool = new Map();
//# sourceMappingURL=fact-service-set.js.map