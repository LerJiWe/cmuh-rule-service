import { ApiConfig, Config } from '@cmuh/api-config';
import { CaseVariable } from '../viewmodel';
export declare class DrugFactService {
    private config;
    private _healthCare;
    private get healthCare();
    constructor(config: ApiConfig<Config>);
    getIsNhi(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<string>;
    getDosageQty(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<number>;
    getDailyQty(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<number>;
    getUsedDays(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getTotalQty(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    private preparedUsedDate;
    getTotalQtyInMonth(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getDrugs(factVariable: CaseVariable, inputParams: Record<string, any>): string[];
    getOrders(factVariable: CaseVariable, inputParams: Record<string, any>): void;
    getFreq(factVariable: CaseVariable, inputParams: Record<string, any>): string;
    /**
     * getAtcCodes
     * @param factVariable
     * @param inputParams
     * 抓取其它開立藥品的 atcCode
     */
    getAtcCodes(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<string[]>;
    getWay(factVariable: CaseVariable, inputParams: Record<string, any>): string;
    getOtherOrder(factVariable: CaseVariable, inputParams: Record<string, any>): string[];
    getOrderTimes(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
}
