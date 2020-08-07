import { ApiConfig, Config } from '@cmuh/api-config';
// import * as ServiceSet from '@cmuh-model/fact-service';
import * as ServiceSet from './index';

import { FactPath, CaseVariable } from '../viewmodel';

//測試

//測試

export class FactServiceSet {

    private static servicePool: Map<string, any> = new Map<string, any>();
    private serviceSet: any = ServiceSet;
    private serviceNames = Object.getOwnPropertyNames(ServiceSet);

    // private static factPool: Map<string, Fact> = new Map<string, Fact>();

    constructor(private config: ApiConfig<Config>) {
        this.config = config;
    }

    /**
     * 輔助抓到並且 new 出 service class 的實體
     * @param serviceName 
     */
    private getServiceClass(serviceName: string) {

        serviceName = this.serviceNames.includes(serviceName) ? serviceName : 'Undefined';
        if (FactServiceSet.servicePool.has(serviceName)) { return FactServiceSet.servicePool.get(serviceName) }

        // const serviceClass = new FactService.serviceSet[serviceName](this.config)
        const serviceClass = new this.serviceSet[serviceName](this.config)

        FactServiceSet.servicePool.set(serviceName, serviceClass);
        return serviceClass;
    }

    /**
     * 直接抓 fact的值給 runtimeFact
     * @param factPath 
     * @param factVariable 
     * @param inputParams 
     */
    public async getFactValue(factPath: FactPath, factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any> {

        // const fact = FactService.factPool.get(factName);

        const tempClass = this.getServiceClass(factPath.serviceName);
        return await tempClass[factPath.functionName](factVariable, inputParams);
    }

    /**
     * 為了給 dynamic fact 回傳對應的 抓值function
     * @param factPath 
     * @param params 
     * @param almanac 
     */
    public async getFactFunction(factPath: FactPath, params: Record<string, any>, almanac: Record<string, any>): Promise<any> {
        // const fact = FactService.factPool.get(factName);

        const tempClass = await this.getServiceClass(factPath.serviceName);
        return tempClass[factPath.functionName](params, almanac);
    }
}
