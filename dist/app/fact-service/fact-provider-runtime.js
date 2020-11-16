"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactProviderRuntime = void 0;
//測試
class FactProviderRuntime {
    constructor(service) {
        this.service = service;
    }
    getFact(caseVariables, inputParams, cacheFacts) {
        return __awaiter(this, void 0, void 0, function* () {
            console.time('getFact');
            let factValueGroup = {};
            for (let factVariable of caseVariables) {
                let factPath = FactProviderRuntime.factPathMap[factVariable.variable];
                if (factPath === undefined) {
                    let err = '不正確的fact名稱';
                    throw err;
                }
                // 如果沒有 cacheFact, 則需要抓值並且放入 factValurGroup之中
                if (cacheFacts[!(factVariable.fullName) ? factVariable.variable : factVariable.fullName] === undefined ||
                    factPath.isCache === false) {
                    // console.log(cacheFacts[!(factVariable.fullName) ? factVariable.name : factVariable.fullName]);
                    factValueGroup[!(factVariable.fullName) ? factVariable.variable : factVariable.fullName]
                        = yield this.service.getFactValue(factPath, factVariable, inputParams);
                }
                else {
                    continue;
                }
            }
            console.timeEnd('getFact');
            return factValueGroup;
        });
    }
}
exports.FactProviderRuntime = FactProviderRuntime;
FactProviderRuntime.factPathMap = {
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
    'groupMedCode': {
        serviceName: 'VisitFactService',
        functionName: 'getGroupMedCode',
        isCache: false
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
    'birthday': {
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
    'totalQtyInMonth': {
        serviceName: 'DrugFactService',
        functionName: 'getTotalQtyInMonth',
        isCache: false
    },
    // 預計新增
    'orders': {
        serviceName: 'DrugFactService',
        functionName: 'getOrders',
        isCache: true
    },
    'drugs': {
        serviceName: 'DrugFactService',
        functionName: 'getOtherOrder',
        isCache: true
    },
    'atc': {
        serviceName: 'DrugFactService',
        functionName: 'getAtcCodes',
        isCache: false
    },
    'way': {
        serviceName: 'DrugFactService',
        functionName: 'getWay',
        isCache: false
    },
    // 檢驗檢查
    'license': {
        serviceName: 'VisitFactService',
        functionName: 'getLicense',
        isCache: true
    },
    'otherOrder': {
        serviceName: 'DrugFactService',
        functionName: 'getOtherOrder',
        isCache: false
    },
    'bloodTypeExist': {
        serviceName: 'PatientFactService',
        functionName: 'getBloodTypeExist',
        isCache: true
    },
    'orderTimes': {
        serviceName: 'DrugFactService',
        functionName: 'getOrderTimes',
        isCache: false
    },
    'reportExist': {
        serviceName: 'DrugFactService',
        functionName: 'getReportExist',
        isCache: true
    }
};
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
//# sourceMappingURL=fact-provider-runtime.js.map