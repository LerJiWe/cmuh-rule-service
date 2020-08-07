import { ApiConfig, Config } from '@cmuh/api-config';
import { FactPath, CaseVariable } from '../viewmodel';
export declare class FactServiceSet {
    private config;
    private static servicePool;
    private serviceSet;
    private serviceNames;
    constructor(config: ApiConfig<Config>);
    /**
     * 輔助抓到並且 new 出 service class 的實體
     * @param serviceName
     */
    private getServiceClass;
    /**
     * 直接抓 fact的值給 runtimeFact
     * @param factPath
     * @param factVariable
     * @param inputParams
     */
    getFactValue(factPath: FactPath, factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    /**
     * 為了給 dynamic fact 回傳對應的 抓值function
     * @param factPath
     * @param params
     * @param almanac
     */
    getFactFunction(factPath: FactPath, params: Record<string, any>, almanac: Record<string, any>): Promise<any>;
}
