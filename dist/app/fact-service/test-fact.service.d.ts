import { ApiConfig, Config } from '@cmuh/api-config';
import { CaseVariable } from '../viewmodel';
import { Almanac } from 'json-rules-engine';
export declare class TestFactService {
    private config;
    private _healthCare;
    private get healthCare();
    constructor(config: ApiConfig<Config>);
    private setCacheFact;
    getTestValueFact(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<number>;
    getTestChartNo(params: Record<string, any>, almanac: Almanac): Promise<unknown>;
    getTestVisitNo(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getTestParams(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getBigFact(params: Record<string, any>, almanac: any): Promise<Record<string, any>>;
    getTestFactRuntime(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getTestNoparams(params: Record<string, any>, almanac: any): Promise<string>;
}
