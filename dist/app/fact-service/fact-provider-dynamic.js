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
exports.FactProviderDynamic = void 0;
const json_rules_engine_1 = require("json-rules-engine");
class FactProviderDynamic {
    constructor(service) {
        this.service = service;
    }
    getFact(caseVariables) {
        return __awaiter(this, void 0, void 0, function* () {
            let factArray = [];
            for (let factVariable of caseVariables) {
                let factPath = FactProviderDynamic.factPathMap[factVariable.variable];
                factArray.push(this.createFact(factVariable.variable, factPath));
                // factValueGroup[factVariable.name] = await this.service.getFactValue(factPath, factVariable, inputParams)
            }
            return factArray;
        });
    }
    createFact(factName, factPath) {
        return new json_rules_engine_1.Fact(factName, (params, almanac) => __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getFactFunction(factPath, params, almanac);
        }), { cache: true });
    }
}
exports.FactProviderDynamic = FactProviderDynamic;
FactProviderDynamic.factPathMap = {
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
};
//# sourceMappingURL=fact-provider-dynamic.js.map