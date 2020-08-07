import { CaseVariable } from '../viewmodel';
export interface FactProvider<T> {
    getFact(caseVariables: CaseVariable[], inputParams: Record<string, any>, cacheFacts: Record<string, any>): T;
}
