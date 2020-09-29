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
exports.VisitFactService = void 0;
const mssql_1 = require("@cmuh/mssql");
class VisitFactService {
    constructor(config) {
        this.config = config;
    }
    get healthCare() {
        if (!this._healthCare) {
            this._healthCare = new mssql_1.SqlExecute(this.config.getDbConfig('healthCare'));
        }
        return this._healthCare;
    }
    getDiags(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            params['visitNo'] = inputParams['visitNo'];
            let tempS = [0, 0];
            let tempE = [0, 0];
            switch (factVariable.params['for']) {
                case 'A':
                    // 入院
                    tempS = [30, 31];
                    tempE = [30, 49];
                    break;
                case 'P':
                    // 住院中,門急
                    tempS = [50, 51];
                    tempE = [50, 69];
                    break;
                case 'D':
                    // 出院
                    tempS = [10, 11];
                    tempE = [10, 29];
                    break;
                case 'S':
                    // 手術
                    tempS = [70, 71];
                    tempE = [70, 89];
                    break;
            }
            switch (factVariable.params['kind']) {
                case ('A'):
                    // ALL 所有
                    params['diagType1'] = Math.min(...tempS);
                    params['diagType2'] = Math.max(...tempE);
                    break;
                case ('P'):
                    // 主診斷
                    params['diagType1'] = Math.min(...tempS);
                    params['diagType2'] = Math.min(...tempE);
                    break;
                case ('S'):
                    // 次診斷
                    params['diagType1'] = Math.max(...tempS);
                    params['diagType2'] = Math.max(...tempE);
                    break;
                default:
                    params['diagType1'] = Math.min(...tempS);
                    params['diagType2'] = Math.max(...tempE);
                    break;
            }
            const result = yield this.healthCare.executeQuery('getDiagRecordInfo', params);
            let diagCodeList = [];
            for (let diagInfo of result) {
                diagCodeList.push(diagInfo.diagCode.trim());
            }
            return diagCodeList;
        });
    }
    getProcedures(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO
        });
    }
    getIndication(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return inputParams['indication'] === undefined ? [] : inputParams['indication'];
            // TODO
        });
    }
    getStationNo(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return inputParams['bed']['stationNo'];
        });
    }
    getDivNo(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const vsDr = inputParams['vsDr']['userCode'];
            const orDr = inputParams['userCode'];
            let params = {};
            // switch (factVariable.params['kind']) {
            //     case 'V':
            //         params['empNo'] = vsDr.substring(1);
            //         break;
            //     case 'O':
            //         params['empNo'] = orDr.substring(1);
            //         break;
            // }
            params['empNo'] = orDr.substring(1);
            const result = yield this.healthCare.executeQuery('getEmpDivision', params);
            let tmpArray = result === undefined ? [] : result;
            let divNos = tmpArray.map(x => {
                return x.divNo.trim();
            });
            return divNos;
            // 等待顧問討論完
        });
    }
    getEmpCode(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            // let resultArray: Array<string> = []
            // switch (factVariable.params['kind']) {
            //     case 'V':
            //         // 主治醫師
            //         resultArray.push(inputParams['vsDr']['userCode']);
            //         break;
            //     case 'O':
            //         // 開單醫師
            //         resultArray.push(inputParams['userCode']);
            //         break;
            //     case 'A':
            //         // 都抓
            //         resultArray.push(inputParams['vsDr']['userCode']);
            //         resultArray.push(inputParams['userCode']);
            //         break;
            //     default:
            //         resultArray.push(inputParams['userCode']);
            //         break;
            // }
            return inputParams['userCode'];
            // return resultArray;
            // TODO 修正成抓取名單中的醫生以及其NP,住院醫師
        });
    }
    getExamValue(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            const examItemNos = factVariable.params["examItemNos"];
            const period = factVariable.params["for"];
            const periodNum = period.substring(0, (period.length - 1));
            const periodUnit = period[period.length - 1];
            const dateOffset = (d, offset) => d.setDate(d.getDate() - offset);
            const monthOffset = (d, offset) => d.setMonth(d.getMonth() - offset);
            const yearOffset = (d, offset) => d.setFullYear(d.getFullYear() - offset);
            const fn = /D/i.test(periodUnit) ?
                dateOffset :
                /M/i.test(periodUnit) ?
                    monthOffset : yearOffset;
            const orderTime = inputParams['orderTime'];
            const endDate = orderTime === undefined ? new Date() : new Date(orderTime);
            const startDate = orderTime === undefined ? new Date() : new Date(orderTime);
            fn(startDate, Number(periodNum));
            params['examItemNos'] = examItemNos;
            params['idNo'] = inputParams['idNo'];
            params['startDate'] = startDate;
            params['endDate'] = endDate;
            const result = yield this.healthCare.executeQuery('getLastLabValue', params);
            if (result.examValue === undefined) {
                let err = '檢驗值不存在';
                throw err;
            }
            else {
                return result.examValue;
            }
            // return result === undefined ? factVariable.params["invalidValue"] : result.examValue
            // let list = Array.isArray(result) ? result : [];
            // list.forEach(x => x.examTime = new Date(x.examTime));
            // list = list.filter(l => { return startDate.getTime() <= l.examTime.getTime() && l.examTime.getTime() <= endDate.getTime() });
            // list = list.sort((a, b) => b.examTime.getTime() - a.examTime.getTime());
            // const [first] = list;
            // return first ? first.examValue : factVariable.params["invalidValue"];
        });
    }
    setDat() { }
    /**
     * 預備給之後抓取名單醫生的 NP,住院
     * @param factVariable
     * @param inputParams
     */
    getD(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const e = factVariable.params['empCodes'];
            // TODO
        });
    }
    // 暫時先不做
    getGroupMedCode(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const medOrderList = inputParams['medOrderList'].length > 0 ? inputParams['medOrderList'] : [];
            let groupNo = inputParams['groupNo'];
            let result = [];
            for (let medOrder of medOrderList) {
                console.log(medOrder.medCode);
                if (groupNo === medOrder.groupNo) {
                    result.push(medOrder.medCode);
                }
            }
            console.log(result);
            return groupNo === 0 ? [] : result;
            // TODO
        });
    }
    // 檢驗檢查新增的 Fact需求
    getLicense(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            const orDr = inputParams['userNo'];
            let params = {};
            params['empNo'] = orDr;
            let r = yield this.healthCare.executeQuery('getLicense', params);
            console.log(params);
            if (r.length === 0) {
                return result;
            }
            else {
                r.forEach(x => {
                    result.push(x.licenseType);
                });
                result.push();
                return result;
            }
        });
    }
}
exports.VisitFactService = VisitFactService;
//# sourceMappingURL=visit-fact.service.js.map