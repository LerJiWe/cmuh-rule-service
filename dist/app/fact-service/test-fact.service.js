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
exports.TestFactService = void 0;
const mssql_1 = require("@cmuh/mssql");
class TestFactService {
    constructor(config) {
        this.config = config;
    }
    get healthCare() {
        if (!this._healthCare) {
            this._healthCare = new mssql_1.SqlExecute(this.config.getDbConfig('healthCare'));
        }
        return this._healthCare;
    }
    setCacheFact(almanac, factName, factValue, params) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[call the setCacheFact]');
            let cacheFact = (yield almanac.factValue('cacheFact')) ? yield almanac.factValue('cacheFact') : {};
            almanac.factValue(factName, params);
            // 舊的
            cacheFact[factName] = factValue;
            //新的
            // cacheFact[factName] = {factValue, params};
            yield almanac.addRuntimeFact('cacheFact', cacheFact);
        });
    }
    getTestValueFact(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[測試動態抓value]');
            return 10;
        });
    }
    getTestChartNo(params, almanac) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("It's time to get chartNo");
            return almanac.factValue('chartNo');
        });
    }
    // test cache in one request
    getTestVisitNo(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[call the visitNo]');
            // let visitNo = await almanac.factValue('chartNo');
            let visitNo = yield inputParams['chartNo'];
            // 測試 cache fact 至不同的 engine之中
            // this.setCacheFact(almanac, 'testVisitNo', visitNo, params);
            // 測試 cache fact 至不同的 engine之中
            return visitNo;
        });
    }
    getTestParams(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[call the params]');
            // almanac.factValue('testParams', params);
            let result;
            switch (factVariable.params['in']) {
                case 'Y':
                    console.log('[params in]');
                    console.log(factVariable.params['in']);
                    result = factVariable.params['in'];
                    break;
                case 'M':
                    console.log('[params in]');
                    console.log(factVariable.params['in']);
                    result = factVariable.params['in'];
                    break;
                default:
                    console.log('[useTheDefault]');
                    result = 'D';
            }
            // this.setCacheFact(almanac, 'testParams', result);
            // setTimeout(()=>{return result}, 100)
            // setTimeout(()=>{return result}, 10000)
            return result;
        });
    }
    getBigFact(params, almanac) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('[params]')
            // console.log(params)
            let result = {};
            result['string'] = params['bId'];
            result['number'] = params['test'];
            return result;
        });
    }
    getTestFactRuntime(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getTestFactRuntime');
            console.log(factVariable);
            return factVariable.params['test'];
        });
    }
    getTestNoparams(params, almanac) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[call the testnoparams]');
            return '12';
        });
    }
}
exports.TestFactService = TestFactService;
//# sourceMappingURL=test-fact.service.js.map