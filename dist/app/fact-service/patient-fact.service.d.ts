import { ApiConfig, Config } from '@cmuh/api-config';
import { CaseVariable } from '../viewmodel';
export declare class PatientFactService {
    private config;
    private _healthCare;
    private get healthCare();
    constructor(config: ApiConfig<Config>);
    getAge(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<number>;
    getMonths(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<number>;
    getDays(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<number>;
    getBirthday(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<string>;
    getGender(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<"1" | "2" | "0">;
    getChartNo(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<any>;
    getPatientInfo(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<Record<string, any>>;
    private calAge;
    private gender;
}
