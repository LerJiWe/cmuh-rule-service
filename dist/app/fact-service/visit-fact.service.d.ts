import { ApiConfig, Config } from '@cmuh/api-config';
import { CaseVariable } from '../viewmodel';
export declare class VisitFactService {
    private config;
    private _healthCare;
    private get healthCare();
    constructor(config: ApiConfig<Config>);
    getDiags(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any[]>;
    getProcedures(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<void>;
    getIndication(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getStationNo(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getDivNo(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<string[]>;
    getEmpCode(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getExamValue(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    private setDat;
    /**
     * 預備給之後抓取名單醫生的 NP,住院
     * @param factVariable
     * @param inputParams
     */
    getD(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<void>;
    getGroupMedCode(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any[]>;
    getLicense(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any[]>;
}
