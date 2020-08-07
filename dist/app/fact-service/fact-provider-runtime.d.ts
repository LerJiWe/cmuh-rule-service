import { FactProvider } from './fact-provider';
import { FactServiceSet } from './fact-service-set';
import { CaseVariable } from '../viewmodel';
export declare class FactProviderRuntime implements FactProvider<Promise<Record<string, any>>> {
    private service;
    constructor(service: FactServiceSet);
    getFact(caseVariables: CaseVariable[], inputParams: Record<string, any>, cacheFacts: Record<string, any>): Promise<Record<string, any>>;
    private static factPathMap;
}
