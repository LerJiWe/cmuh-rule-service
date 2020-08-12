import { FactProvider } from './fact-provider';
import { FactServiceSet } from './fact-service-set';

import { CaseVariable, FactPath } from '../viewmodel';

//測試
import { ApiConfig, Config } from '@cmuh/api-config';
import { join } from 'path';
//測試

export class FactProviderRuntime implements FactProvider<Promise<Record<string, any>>> {

    constructor(private service: FactServiceSet) { }

    public async getFact(caseVariables: CaseVariable[],
        inputParams: Record<string, any>,
        cacheFacts: Record<string, any>): Promise<Record<string, any>> {
        console.time('getFact');

        let factValueGroup: Record<string, any> = {};

        for (let factVariable of caseVariables) {

            let factPath = FactProviderRuntime.factPathMap[factVariable.variable];

            // 如果沒有 cacheFact, 則需要抓值並且放入 factValurGroup之中
            if (cacheFacts[!(factVariable.fullName) ? factVariable.variable : factVariable.fullName] === undefined ||
                factPath.isCache === false) {

                // console.log(cacheFacts[!(factVariable.fullName) ? factVariable.name : factVariable.fullName]);

                factValueGroup[!(factVariable.fullName) ? factVariable.variable : factVariable.fullName]
                    = await this.service.getFactValue(factPath, factVariable, inputParams)
            }
            else {
                continue;
            }
        }

        console.timeEnd('getFact');
        return factValueGroup;
    }




    private static factPathMap: Record<string, FactPath> = {
        // VisitFact
        //測試
        'testValueFact': {
            serviceName: 'TestFactService',
            functionName: 'getTestValueFact',
            isCache: true
        },
        'testParams': {
            serviceName: 'TestFactService',
            functionName: 'getTestParams',
            isCache: true
        },
        'testNoparams': {
            serviceName: 'TestFactService',
            functionName: 'getTestNoparams',
            isCache: true
        },
        'testVisitNo': {
            serviceName: 'TestFactService',
            functionName: 'getTestVisitNo',
            isCache: true
        },
        'testFact': {
            serviceName: 'TestFactService',
            functionName: 'getTestFactRuntime',
            isCache: true
        },
        //測試
        'diagnoses': {
            serviceName: 'VisitFactService',
            functionName: 'getDiags',
            isCache: true
        },
        'procedures': { // TODO
            serviceName: 'VisitFactService',
            functionName: 'getProcedures',
            isCache: true
        },
        'indication': { // 目前陳副版本不採用
            serviceName: 'VisitFactService',
            functionName: 'getIndication',
            isCache: true
        },
        'station': {
            serviceName: 'VisitFactService',
            functionName: 'getStationNo',
            isCache: true
        },
        'division': {
            serviceName: 'VisitFactService',
            functionName: 'getDivNo',
            isCache: true
        },
        'doctor': {
            serviceName: 'VisitFactService',
            functionName: 'getEmpCode',
            isCache: true
        },
        'examValue': {
            serviceName: 'VisitFactService',
            functionName: 'getExamValue',
            isCache: true
        },
        'groupMedCode': { // 目前陳副版本不採用
            serviceName: 'VisitFactService',
            functionName: 'getGroupMedCode',
            isCache: false
        },
        //PatientFact
        'patientInfo': { // 目前不採用
            serviceName: 'PatientFactService',
            functionName: 'getPatientInfo',
            isCache: true
        },
        'age': {
            serviceName: 'PatientFactService',
            functionName: 'getAge',
            isCache: true
        },
        'months': {
            serviceName: 'PatientFactService',
            functionName: 'getMonths',
            isCache: true
        },
        'days': {
            serviceName: 'PatientFactService',
            functionName: 'getDays',
            isCache: true
        },
        'birthdate': {
            serviceName: 'PatientFactService',
            functionName: 'getBirthday',
            isCache: true
        },
        'gender': {
            serviceName: 'PatientFactService',
            functionName: 'getGender',
            isCache: true
        },
        'patient': {
            serviceName: 'PatientFactService',
            functionName: 'getChartNo',
            isCache: true
        },
        // DrugFact
        'isNhi': {
            serviceName: 'DrugFactService',
            functionName: 'getIsNhi',
            isCache: false
        },
        'dosage': {
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
        'freq': {
            serviceName: 'DrugFactService',
            functionName: 'getFreq',
            isCache: false
        },
        'totalQtyInMonth': { // 目前陳副版本不採用
            serviceName: 'DrugFactService',
            functionName: 'getTotalQtyInMonth',
            isCache: false
        },
        // 預計新增
        'orders': { // TODO 暫時先拿掉
            serviceName: 'DrugFactService',
            functionName: 'getOrders',
            isCache: true
        },
        'drugs': { // TODO
            serviceName: 'DrugFactService',
            functionName: 'getDrugs',
            isCache: true
        },
        'atc': { // TODO
            serviceName: 'DrugFactService',
            functionName: 'getAtcCodes',
            isCache: true
        },
        'way': { // TODO
            serviceName: 'DrugFactService',
            functionName: 'getWay',
            isCache: true
        }
    }
}

// TEST

// const config = new ApiConfig<Config>(join(__dirname, '../../api.config.json'));
// let service = new FactService(config)
// // new FactProvider(service).getFact(
// //     [
// //         // {
// //         //     name: 'birthday',
// //         //     params: {}
// //         // },
// //         {
// //             name: 'age',
// //             params: {}
// //         },
// //         // {
// //         //     name: 'gender',
// //         //     params: {}
// //         // }
// //     ],
// //     {
// //         "chartNo": "0024065997"
// //     }
// // );

// new FactProvider(service).getFact(
//     [
//         {
//             name: 'patientInfo',
//             params: { 'ageUnit': 'days' }
//         }
//     ],
//     {
//         "chartNo": "0024065997"
//     }
// );