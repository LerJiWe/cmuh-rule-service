import { FactProvider } from './fact-provider';
import { FactServiceSet } from './fact-service-set';
import { Fact } from 'json-rules-engine';
import { CaseVariable } from '../viewmodel';
export declare class FactProviderDynamic implements FactProvider<Promise<Fact[]>> {
    private service;
    constructor(service: FactServiceSet);
    getFact(caseVariables: CaseVariable[]): Promise<Fact[]>;
    private createFact;
    private static factPathMap;
}
