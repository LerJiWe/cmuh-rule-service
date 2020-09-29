import { ApiConfig, Config } from '@cmuh/api-config';
import { SqlExecute } from '@cmuh/mssql';
import { CaseVariable } from '../viewmodel';

export class VisitFactService {

    private _healthCare!: SqlExecute;
    private get healthCare(): SqlExecute {

        if (!this._healthCare) {
            this._healthCare = new SqlExecute(this.config.getDbConfig('healthCare'));
        }
        return this._healthCare;
    }

    constructor(private config: ApiConfig<Config>) { }

    public async getDiags(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let params: Record<string, any> = {}
        params['visitNo'] = inputParams['visitNo'];

        let tempS: [number, number] = [0, 0];
        let tempE: [number, number] = [0, 0];

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

        const result = await this.healthCare.executeQuery('getDiagRecordInfo', params);

        let diagCodeList = [];
        for (let diagInfo of result) {
            diagCodeList.push(diagInfo.diagCode.trim());
        }
        return diagCodeList;
    }

    public async getProcedures(factVariable: CaseVariable, inputParams: Record<string, any>) {
        // TODO
    }

    public async getIndication(factVariable: CaseVariable, inputParams: Record<string, any>) {

        return inputParams['indication'] === undefined ? [] : inputParams['indication'];
        // TODO
    }

    public async getStationNo(factVariable: CaseVariable, inputParams: Record<string, any>) {

        return inputParams['bed']['stationNo'];
    }

    public async getDivNo(factVariable: CaseVariable, inputParams: Record<string, any>) {

        const vsDr: string = inputParams['vsDr']['userCode'];
        const orDr: string = inputParams['userCode'];

        let params: Record<string, any> = {}

        // switch (factVariable.params['kind']) {
        //     case 'V':
        //         params['empNo'] = vsDr.substring(1);
        //         break;
        //     case 'O':
        //         params['empNo'] = orDr.substring(1);
        //         break;
        // }

        params['empNo'] = orDr.substring(1);

        const result = await this.healthCare.executeQuery('getEmpDivision', params);

        let tmpArray: Array<{ empNo: number, divNo: string }> = result === undefined ? [] : result;
        let divNos = tmpArray.map(x => {
            return x.divNo.trim()
        });

        return divNos;
        // 等待顧問討論完
    }

    public async getEmpCode(factVariable: CaseVariable, inputParams: Record<string, any>) {

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
    }

    public async getExamValue(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let params: Record<string, any> = {}
        const examItemNos = factVariable.params["examItemNos"];

        const period: string = factVariable.params["for"];
        const periodNum = period.substring(0, (period.length - 1));
        const periodUnit = period[period.length - 1];

        const dateOffset = (d: Date, offset: number) => d.setDate(d.getDate() - offset);
        const monthOffset = (d: Date, offset: number) => d.setMonth(d.getMonth() - offset);
        const yearOffset = (d: Date, offset: number) => d.setFullYear(d.getFullYear() - offset);
        const fn = /D/i.test(periodUnit) ?
            dateOffset :
            /M/i.test(periodUnit) ?
                monthOffset : yearOffset;

        const orderTime = inputParams['orderTime'];
        const endDate = orderTime === undefined ? new Date() : new Date(orderTime);
        const startDate = orderTime === undefined ? new Date() : new Date(orderTime);
        fn(startDate, Number(periodNum))



        params['examItemNos'] = examItemNos;
        params['idNo'] = inputParams['idNo'];
        params['startDate'] = startDate;
        params['endDate'] = endDate

        const result = await this.healthCare.executeQuery('getLastLabValue', params);

        if (result.examValue === undefined) {
            let err: string = '檢驗值不存在';
            throw err;
        } else {
            return result.examValue;
        }

        // return result === undefined ? factVariable.params["invalidValue"] : result.examValue

        // let list = Array.isArray(result) ? result : [];
        // list.forEach(x => x.examTime = new Date(x.examTime));

        // list = list.filter(l => { return startDate.getTime() <= l.examTime.getTime() && l.examTime.getTime() <= endDate.getTime() });

        // list = list.sort((a, b) => b.examTime.getTime() - a.examTime.getTime());

        // const [first] = list;

        // return first ? first.examValue : factVariable.params["invalidValue"];

    }

    private setDat() { }

    /**
     * 預備給之後抓取名單醫生的 NP,住院
     * @param factVariable 
     * @param inputParams 
     */
    public async getD(factVariable: CaseVariable, inputParams: Record<string, any>) {
        const e: string[] = factVariable.params['empCodes']
        // TODO
    }


    // 暫時先不做
    public async getGroupMedCode(factVariable: CaseVariable, inputParams: Record<string, any>) {
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
    }

    // 檢驗檢查新增的 Fact需求
    
    public async getLicense(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let result = [];
        
        const orDr: string = inputParams['userNo'];

        let params: Record<string, any> = {}
        params['empNo'] = orDr;
        let r = await this.healthCare.executeQuery('getLicense', params);
        console.log(params);

        if (r.length === 0) {
            return result;
        } else {
            r.forEach(x => {
                result.push(x.licenseType)
            });
            result.push()
            return result;
        }        
    }

}