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
exports.PatientFactService = void 0;
const mssql_1 = require("@cmuh/mssql");
class PatientFactService {
    constructor(config) {
        this.config = config;
    }
    get healthCare() {
        if (!this._healthCare) {
            this._healthCare = new mssql_1.SqlExecute(this.config.getDbConfig('healthCare'));
        }
        console.log('call the stored procedure');
        return this._healthCare;
    }
    getAge(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let birthdayString = yield this.getBirthday(factVariable, inputParams);
            // console.log('生日', birthdayString);
            const birthday = new Date(birthdayString);
            // const now = inputParams['orderTime'] === undefined ? new Date() : new Date(inputParams['orderTime'])
            const now = new Date();
            const nowY = now.getFullYear();
            const birthdayY = birthday.getFullYear();
            const nowM = now.getMonth();
            const birthdayM = birthday.getMonth();
            const nowD = now.getDate();
            const birthdayD = birthday.getDate();
            let result;
            switch (factVariable.params['in']) {
                case 'Y':
                    result = nowY - birthdayY;
                    break;
                case 'M':
                    result = nowM - birthdayM >= 0 ? nowY - birthdayY : nowY - birthdayY - 1;
                    break;
                case 'D':
                    result = nowM - birthdayM > 0 ?
                        nowY - birthdayY :
                        nowM - birthdayM < 0 ?
                            nowY - birthdayY - 1 :
                            nowD - birthdayD >= 0 ?
                                nowY - birthdayY :
                                nowY - birthdayY - 1;
                    break;
                default:
                    result = nowM - birthdayM > 0 ?
                        nowY - birthdayY :
                        nowM - birthdayM < 0 ?
                            nowY - birthdayY - 1 :
                            nowD - birthdayD >= 0 ?
                                nowY - birthdayY :
                                nowY - birthdayY - 1;
                    break;
            }
            return result;
        });
    }
    getMonths(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let birthdayString = yield this.getBirthday(factVariable, inputParams);
            const birthday = new Date(birthdayString);
            const now = inputParams['orderTime'] === undefined ? new Date() : new Date(inputParams['orderTime']);
            const nowY = now.getFullYear();
            const birthdayY = birthday.getFullYear();
            const nowM = now.getMonth();
            const birthdayM = birthday.getMonth();
            const nowD = now.getDate();
            const birthdayD = birthday.getDate();
            switch (factVariable.params['in']) {
                case 'M':
                    return (nowY - birthdayY) * 12 + nowM - birthdayM;
                case 'D':
                    return nowD - birthdayD >= 0 ?
                        (nowY - birthdayY) * 12 + nowM - birthdayM :
                        (nowY - birthdayY) * 12 + nowM - birthdayM - 1;
                default:
                    return nowD - birthdayD >= 0 ?
                        (nowY - birthdayY) * 12 + nowM - birthdayM :
                        (nowY - birthdayY) * 12 + nowM - birthdayM - 1;
            }
        });
    }
    getDays(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let birthdayString = yield this.getBirthday(factVariable, inputParams);
            const birthday = new Date(birthdayString);
            const now = new Date();
            const millisecond = now.getTime() - birthday.getTime();
            const days = (millisecond / (1000 * 60 * 60 * 24));
            return yield days;
        });
    }
    getBirthday(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            params['empNo'] = '33878';
            params['chartNo'] = inputParams['chartNo'];
            const result = inputParams['birthday'] == undefined ?
                yield this.healthCare.executeQuery('getPatientsByChartNo', params)
                : inputParams['birthday'];
            let birthdayString = result[0].birthday === undefined ? result : result[0].birthday;
            birthdayString = birthdayString.replace(/-/g, "/").replace(/T/g, " ");
            return birthdayString;
        });
    }
    getGender(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            params['empNo'] = '33878';
            params['chartNo'] = inputParams['chartNo'];
            const result = inputParams['sex'] == undefined ?
                yield this.healthCare.executeQuery('getPatientsByChartNo', params)
                : inputParams['sex'];
            const sex = result[0].sex === undefined ? result : result[0].sex;
            return sex;
        });
    }
    getChartNo(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return inputParams['chartNo'];
        });
    }
    // 測試 應用 path ↓
    getPatientInfo(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            params['empNo'] = '33878';
            params['chartNo'] = inputParams['chartNo'];
            const result = yield this.healthCare.executeQuery('getPatientsByChartNo', params);
            let r = {};
            r['age'] = this.calAge(result, inputParams);
            r['gender'] = this.gender(result, inputParams);
            return r;
        });
    }
    calAge(result, params) {
        const birthdayString = result[0].birthday.replace(/-/g, "/").replace(/T/g, " ");
        const birthday = new Date(birthdayString);
        const now = new Date();
        const millisecond = now.getTime() - birthday.getTime();
        const days = (millisecond / (1000 * 60 * 60 * 24));
        const years = Math.floor(days / 365);
        switch (params['ageUnit']) {
            case 'years':
                return years;
            case 'days':
                return days;
            default:
                return years;
        }
    }
    gender(result, params) {
        const sex = result[0].sex;
        switch (sex) {
            case '男':
                return "1";
            case '女':
                return "2";
            default:
                return "0";
        }
    }
    // 檢驗檢查新增的 Fact需求
    getBloodTypeExist(factVariable, inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            let idNo = inputParams['idNo'];
            params['idNo'] = idNo;
            let r = yield this.healthCare.executeQuery('getBloodType', params);
            console.log('rrrr', r);
            if (r.length === 0) {
                return 'FALSE';
            }
            else {
                let rFilter = r.filter(x => x.bloodType.trim() !== '');
                let result = rFilter.length === 0 ? 'FALSE' : 'TRUE';
                return result;
            }
            // if (r.bloodType === undefined) {
            //     return 'FALSE';
            // } else {
            //     let result: string = r.bloodType.trim() == '' ? 'FALSE' : 'TRUE';
            //     return result;
            // }
        });
    }
}
exports.PatientFactService = PatientFactService;
//# sourceMappingURL=patient-fact.service.js.map