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
exports.DrugFactService = void 0;
const mssql_1 = require("@cmuh/mssql");
class DrugFactService {
    constructor(config) {
        this.config = config;
    }
    get healthCare() {
        if (!this._healthCare) {
            this._healthCare = new mssql_1.SqlExecute(this.config.getDbConfig('healthCare'));
        }
        return this._healthCare;
    }
    get healthRecord() {
        if (!this._healthRecord) {
            this._healthRecord = new mssql_1.SqlExecute(this.config.getDbConfig('healthRecord'));
        }
        return this._healthRecord;
    }
    getIsNhi(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = inputParams['isSelf'] ? "FALSE" : "TRUE";
            return r;
        });
    }
    getDosageQty(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            // dosage 是開立的每次劑量,單位可能不是計價也不是服用
            // dosageQty 是本次開立的每次劑量
            // dosageUnit 本次開立的劑量單位
            // displayDoseUnit 藥局設定的服用單位
            // displayDoseRatio 服用單位劑量: 計價單位劑量 的比值
            // dosageUnitOptions 是藥品的單位選項 {unit: 單位,ratio: 比值}
            // const dosage = inputParams['dosage'];
            const dosageQty = inputParams['dosageQty'];
            const dosageUnit = inputParams['dosageUnit'];
            const dosageUnitOptions = inputParams['dosageUnitOptions'];
            const displayDoseUnit = inputParams["displayDoseUnit"];
            let targetUnit = factVariable.params['unit'];
            if (targetUnit === undefined || targetUnit.length === 0) {
                targetUnit = displayDoseUnit || dosageUnit;
            }
            let orderToNhiRatio = dosageUnitOptions.find(dop => dop.unit.toLowerCase() === dosageUnit.toLowerCase());
            let targetToNhiRatio = dosageUnitOptions.find(dop => dop.unit.toLowerCase() === targetUnit.toLowerCase());
            if (orderToNhiRatio === undefined) {
                console.log('orderToNhiRatio is undefined');
                let err = '單位轉換有問題';
                throw err;
            }
            else if (targetToNhiRatio === undefined) {
                console.log('nhiToRatio is undefined');
                let err = '單位轉換有問題';
                throw err;
            }
            else {
                let tempDosageQty = dosageQty / Number(orderToNhiRatio.ratio); // 換成計價單位
                return tempDosageQty * Number(targetToNhiRatio.ratio);
            }
        });
    }
    getDailyQty(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const timePoint = inputParams["timePoint"];
            let usedTimes = Array.from(timePoint).filter(x => { return x === '1'; }).length;
            let dosageQty = yield this.getDosageQty(factVariable, inputParams);
            return dosageQty * usedTimes;
        });
    }
    getUsedDays(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const periodOrType = factVariable.params["for"];
            if (periodOrType === 'N') {
                return inputParams["usedDays"];
            }
            else if (periodOrType === 'V') {
                console.log('TODO for this visit');
            }
            else if (periodOrType === 'E') {
                console.log('TODO for Ever');
            }
            else {
                let params = {};
                params['medCode'] = inputParams['medCode'];
                params['idNo'] = inputParams['idNo'];
                let period = typeof (periodOrType) === 'string' ? undefined : periodOrType;
                let usedDate = yield this.preparedUsedDate(period);
                params['startDate'] = usedDate.startDate;
                params['endDate'] = usedDate.endDate;
                params['isSelfList'] = [0, 1];
                const result = yield this.healthCare.executeQuery('getDrugUsedQty', params);
                // console.log('result', result);
                // let list = Array.isArray(result) ? result : [];
                let r = result.usedDays === undefined ? 0 : result.usedDays;
                let days = inputParams['usedDays'];
                // let admissionList: Set<string> = new Set();
                // let otherTime: number = 0;
                // list.forEach(l => {
                //     if (l.visitType === 'A') {
                //         const time = new Date(l.execTime)
                //         admissionList.add(time.toDateString());
                //     } else {
                //         const s = new Date(l.startDate);
                //         const e = new Date(l.endDate);
                //         otherTime += (e.getTime() - s.getTime()) / (24 * 60 * 60 * 1000) + 1;
                //     }
                // });
                // days += admissionList.size;
                // console.log(admissionList);
                // days += otherTime;
                return days + r;
            }
            // TODO
            // switch (factVariable.params.for) {
            //     case 'N':
            //         break;
            //     case 'V':
            //         break;
            //     case 'E':
            //         break;
            //     default:
            //         break;
            // }
            return inputParams['usedDays'];
        });
    }
    getTotalQty(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const periodOrType = factVariable.params["for"];
            if (periodOrType === 'N') {
                return inputParams['totalQty'];
            }
            else if (periodOrType === 'V') {
                console.log('TODO for this visit');
                return inputParams['totalQty'];
            }
            else if (periodOrType === 'E') {
                console.log('TODO for Ever');
                return inputParams['totalQty'];
            }
            else {
                let params = {};
                params['medCode'] = inputParams['medCode'];
                // console.log('MedCode:', params['medCode']);
                params['idNo'] = inputParams['idNo'];
                // console.log('IdNo:', params['idNo']);
                let period = typeof (periodOrType) === 'string' ? undefined : periodOrType;
                let usedDate = yield this.preparedUsedDate(period);
                params['startDate'] = usedDate.startDate;
                params['endDate'] = usedDate.endDate;
                // console.log('startDate', startDate);
                // console.log('endDate', endDate);
                // TODO 根據參數決定抓取 1.健保的量 2.自費的量 3.全都要
                params['isSelfList'] = [0, 1];
                const result = yield this.healthCare.executeQuery('getDrugUsedQty', params);
                // console.log(result);
                // let list = Array.isArray(result) ? result : [];
                let r = result.usedQty === undefined ? 0 : result.usedQty;
                let qty = inputParams['totalQty'];
                // list.forEach(l => { qty += l.usedQty });
                return qty + r;
            }
        });
    }
    preparedUsedDate(period) {
        return __awaiter(this, void 0, void 0, function* () {
            // const periodNum = period.substring(0, (period.length - 1));
            // const periodUnit = period[period.length - 1];
            const periodNum = period.quantity;
            const periodUnit = period.unit;
            let fn;
            const dateOffset = (d, offset) => d.setDate(d.getDate() - offset);
            const monthOffset = (d, offset) => d.setMonth(d.getMonth() - offset);
            const yearOffset = (d, offset) => d.setFullYear(d.getFullYear() - offset);
            const sYearOffset = (d, offset) => {
                d.setFullYear(d.getFullYear() - offset);
                d.setMonth(0);
                d.setDate(1);
            };
            switch (periodUnit) {
                case 'D':
                    fn = dateOffset;
                    break;
                case 'M':
                    fn = monthOffset;
                    break;
                case 'Y':
                    fn = yearOffset;
                    break;
                case 'S':
                    fn = sYearOffset;
                    break;
                default:
                    throw 'fact的時間單位設定錯誤';
                    break;
            }
            const startDate = new Date();
            fn(startDate, Number(periodNum));
            const endDate = new Date();
            return { startDate, endDate };
        });
    }
    // public async getTotalQtyInPeriod(factVariable: CaseVariable, inputParams: Record<string, any>) {
    //     let params: Record<string, any> = {}
    //     params['medCode'] = inputParams['medCode'];
    //     params['idNo'] = inputParams['idNo'];
    //     const periodOrType: string = factVariable.params["for"];
    //     const periodNum = periodOrType.substring(0, (periodOrType.length - 1));
    //     const periodUnit = periodOrType[periodOrType.length - 1];
    //     const dateOffset = (d: Date, offset: number) => d.setDate(d.getDate() - offset);
    //     const monthOffset = (d: Date, offset: number) => d.setMonth(d.getMonth() - offset);
    //     const yearOffset = (d: Date, offset: number) => d.setFullYear(d.getFullYear() - offset);
    //     const fn = /D/i.test(periodUnit) ?
    //         dateOffset :
    //         /M/i.test(periodUnit) ?
    //             monthOffset : yearOffset;
    //     const startDate = new Date()
    //     fn(startDate, Number(periodNum));
    //     const endDate = new Date();
    //     // console.log(startDate);
    //     // console.log(endDate);
    //     params['startDate'] = startDate;
    //     params['endDate'] = endDate;
    //     const result = await this.healthCare.executeQuery('getTotalQtyInPeriod', params)
    //     let list = Array.isArray(result) ? result : [];
    //     // console.log(list);
    //     let qty = inputParams['totalQty'];
    //     list.forEach(l => { qty += l.execQty });
    //     return qty;
    // }
    getTotalQtyInMonth(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            params['medCode'] = inputParams['medCode'];
            params['idNo'] = inputParams['idNo'];
            const dateSet = (d) => d.setDate(1);
            const startDate = new Date();
            dateSet(startDate);
            const endDate = new Date();
            params['startDate'] = startDate;
            params['endDate'] = endDate;
            // console.log(startDate);
            // console.log(endDate);
            const result = yield this.healthCare.executeQuery('getTotalQtyInPeriod', params);
            let list = Array.isArray(result) ? result : [];
            // console.log(result)
            let qty = inputParams['totalQty'];
            list.forEach(l => { qty += l.execQty; });
            return qty;
        });
    }
    // public async getUsedDaysInPeriod(factVariable: CaseVariable, inputParams: Record<string, any>) {
    //     // console.log('[usedDaysInPeriod]')
    //     let params: Record<string, any> = {}
    //     params['medCode'] = inputParams['medCode'];
    //     params['idNo'] = inputParams['idNo'];
    //     const period: string = factVariable.params["for"];
    //     const periodNum = period.substring(0, (period.length - 1));
    //     const periodUnit = period[period.length - 1];
    //     const dateOffset = (d: Date, offset: number) => d.setDate(d.getDate() - offset);
    //     const monthOffset = (d: Date, offset: number) => d.setMonth(d.getMonth() - offset);
    //     const yearOffset = (d: Date, offset: number) => d.setFullYear(d.getFullYear() - offset);
    //     const fn = /D/i.test(periodUnit) ?
    //         dateOffset :
    //         /M/i.test(periodUnit) ?
    //             monthOffset : yearOffset;
    //     const startDate = new Date()
    //     fn(startDate, Number(periodNum));
    //     const endDate = new Date();
    //     // console.log(startDate);
    //     // console.log(endDate);
    //     params['startDate'] = startDate;
    //     params['endDate'] = endDate;
    //     const result = await this.healthCare.executeQuery('getTotalQtyInPeriod', params)
    //     let list = Array.isArray(result) ? result : [];
    //     // console.log(list);
    //     let admissionList: Set<string> = new Set();
    //     let otherTime: number = 0;
    //     list.forEach(l => {
    //         if (l.visitType === 'A') {
    //             const time = new Date(l.execTime)
    //             admissionList.add(time.toDateString());
    //         } else {
    //             const s = new Date(l.startDate);
    //             const e = new Date(l.endDate);
    //             otherTime += (e.getTime() - s.getTime()) / (24 * 60 * 60 * 1000) + 1;
    //         }
    //     });
    //     let days = inputParams['usedDays'];
    //     days += admissionList.size;
    //     // console.log(admissionList);
    //     days += otherTime;
    //     return days;
    //     // TODO
    // }
    getOrders(factVariable, inputParams) {
        // TODO
    }
    getFreq(factVariable, inputParams) {
        let usage = inputParams["usage"];
        return usage.trim();
    }
    /**
     * getAtcCodes
     * @param factVariable
     * @param inputParams
     * 抓取其它開立藥品的 atcCode
     */
    getAtcCodes(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = [];
            let result = [];
            let medOrderList = inputParams["medOrderList"];
            let medCode = inputParams["medCode"];
            // TODO 跟藥師確認, atc code是否有要加入自己的
            let filterArray = medOrderList.filter(x => { return x.medCode.trim() !== medCode.trim(); });
            filterArray.forEach(x => {
                params.push(x.medCode.trim());
            });
            // medOrderList.forEach(x => {
            //     params.medCodeList.push(x.medCode);
            // });
            const spResult = yield this.healthCare.executeQuery('getAtcCodes', params);
            spResult.forEach(x => {
                result.push(x.atcCode.trim());
            });
            return result;
        });
    }
    getWay(factVariable, inputParams) {
        let way = inputParams["way"];
        return way;
    }
    // 檢驗檢查新增的 Fact需求
    getOtherOrder(factVariable, inputParams) {
        let medOrderList = inputParams["medOrderList"];
        let medCode = inputParams["medCode"];
        let medCodeList = [];
        let filterArray = medOrderList.filter(x => { return x.medCode.trim() !== medCode.trim(); });
        filterArray.forEach(x => {
            medCodeList.push(x.medCode.trim());
        });
        return medCodeList;
    }
    getOrderTimes(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = 0;
            const periodOrType = factVariable.params["for"];
            let medCodes = factVariable.params['medCodes'] || [];
            medCodes.push(inputParams['medCode']);
            let params = {};
            params['medCodes'] = medCodes;
            params['idNo'] = inputParams['idNo'];
            let dosage = inputParams['dosage'] || 1;
            if (periodOrType === 'N') {
                return dosage;
            }
            else if (periodOrType === 'E') {
                // console.log('for=E');
                params['startDate'] = new Date('1911/01/01');
                params['endDate'] = new Date();
                // console.time('getExamTimes');
                let r = yield this.healthCare.executeQuery('getExamTimes', params);
                // console.timeEnd('getExamTimes');
                r.forEach(x => {
                    result += Number(x.usedTimes);
                    // console.log(Number(x.usedTimes));
                });
                // console.log('r', r);
                return result + Number(dosage);
            }
            else {
                let period = typeof (periodOrType) === 'string' ? undefined : periodOrType;
                let usedDate = yield this.preparedUsedDate(period);
                params['startDate'] = usedDate.startDate;
                params['endDate'] = usedDate.endDate;
                let r = yield this.healthCare.executeQuery('getExamTimes', params);
                r.forEach(x => {
                    result += Number(x.usedTimes);
                    // console.log(Number(x.usedTimes));
                });
                return result + Number(dosage);
            }
        });
    }
    getReportExist(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const periodOrType = factVariable.params["for"];
            let examTypes = factVariable.params['examTypes'] || [];
            let params = {};
            params['idNo'] = inputParams['idNo'];
            params['examTypes'] = examTypes;
            if (periodOrType === 'E') {
                params['startDate'] = new Date('1911/01/01');
                params['endDate'] = new Date();
                let r = yield this.healthRecord.executeQuery('getExistExamReport', params);
                // console.log('result', r);            
                if (r.length > 0) {
                    return 'TRUE';
                }
                else {
                    return 'FALSE';
                }
            }
            else {
                let period = typeof (periodOrType) === 'string' ? undefined : periodOrType;
                let usedDate = yield this.preparedUsedDate(period);
                params['startDate'] = usedDate.startDate;
                params['endDate'] = usedDate.endDate;
                let r = yield this.healthRecord.executeQuery('getExistExamReport', params);
                // console.log('result', r);
                if (r.length > 0) {
                    return 'TRUE';
                }
                else {
                    return 'FALSE';
                }
            }
        });
    }
}
exports.DrugFactService = DrugFactService;
//# sourceMappingURL=drug-fact.service.js.map