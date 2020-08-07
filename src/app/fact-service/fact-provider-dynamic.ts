import { FactProvider } from './fact-provider';
import { FactServiceSet } from './fact-service-set';

import { Fact } from 'json-rules-engine';

import { CaseVariable, FactPath } from '../viewmodel';

export class FactProviderDynamic implements FactProvider<Promise<Fact[]>> {

    constructor(private service: FactServiceSet) { }

    public async getFact(caseVariables: CaseVariable[]): Promise<Fact[]> {

        let factArray: Fact[] = [];

        for (let factVariable of caseVariables) {

            let factPath = FactProviderDynamic.factPathMap[factVariable.variable];

            factArray.push(this.createFact(factVariable.variable, factPath));
            // factValueGroup[factVariable.name] = await this.service.getFactValue(factPath, factVariable, inputParams)
        }
        return factArray;
    }

    private createFact(factName: string, factPath: FactPath) {

        return new Fact(factName,
            async (params, almanac) => {
                return await this.service.getFactFunction(factPath, params, almanac)
            }, { cache: true });
    }

    private static factPathMap: Record<string, FactPath> = {
        // VisitFact
        //測試
        'testParams': {
            serviceName: 'VisitFactService',
            functionName: 'getTestParams',
            isCache: true
        },
        'testVisitNo': {
            serviceName: 'VisitFactService',
            functionName: 'getTestVisitNo',
            isCache: true
        },
        'bigFact': {
            serviceName: 'VisitFactService',
            functionName: 'getBigFact',
            isCache: true
        },
        'testNoparams': {
            serviceName: 'VisitFactService',
            functionName: 'getTestNoparams',
            isCache: true
        },
        'testFact': {
            serviceName: 'VisitFactService',
            functionName: 'getTestFact',
            isCache: true
        },
        //測試
        'diagnoses': {
            serviceName: 'VisitFactService',
            functionName: 'getDiags',
            isCache: true
        },
        'divNo': {
            serviceName: 'VisitFactService',
            functionName: 'getDivNo',
            isCache: true
        },
        'empCode': {
            serviceName: 'VisitFactService',
            functionName: 'getEmpCode',
            isCache: true
        },
        'groupMedCode': {
            serviceName: 'VisitFactService',
            functionName: 'getGroupMedCode',
            isCache: true
        },
        'procedures': {
            serviceName: 'VisitFactService',
            functionName: 'getProcedures',
            isCache: true
        },
        'indication': {
            serviceName: 'VisitFactService',
            functionName: 'getIndication',
            isCache: true
        },
        'stationNo': {
            serviceName: 'VisitFactService',
            functionName: 'getStationNo',
            isCache: true
        },
        //PatientFact
        'patientInfo': {
            serviceName: 'PatientFactService',
            functionName: 'getPatientInfo',
            isCache: true
        },
        'age': {
            serviceName: 'PatientFactService',
            functionName: 'getAge',
            isCache: true
        },
        'days': {
            serviceName: 'PatientFactService',
            functionName: 'getDays',
            isCache: true
        },
        'birthday': {
            serviceName: 'PatientFactService',
            functionName: 'getBirthday',
            isCache: true
        },
        'sex': {
            serviceName: 'PatientFactService',
            functionName: 'getGender',
            isCache: true
        },
        'chartNo': {
            serviceName: 'PatientFactService',
            functionName: 'getChartNo',
            isCache: true
        },
        
        // DrugFact
        'dosageQty': {
            serviceName: 'DrugFactService',
            functionName: 'getDosageQty',
            isCache: false
        },
        'usedDays': {
            serviceName: 'DrugFactService',
            functionName: 'getUsedDays',
            isCache: false
        },
        'dailyQty': {
            serviceName: 'DrugFactService',
            functionName: 'getDailyQty',
            isCache: false
        },
        'totalQty': {
            serviceName: 'DrugFactService',
            functionName: 'getTotalQty',
            isCache: false
        },
        'totalQtyInPeriod': {
            serviceName: 'DrugFactService',
            functionName: 'getTotalQtyInPeriod',
            isCache: false
        },
        'totalQtyInMonth': {
            serviceName: 'DrugFactService',
            functionName: 'getTotalQtyInMonth',
            isCache: false
        },
        'usedDaysInPeriod': {
            serviceName: 'DrugFactService',
            functionName: 'getUsedDaysInPeriod',
            isCache: false
        }
    }
}