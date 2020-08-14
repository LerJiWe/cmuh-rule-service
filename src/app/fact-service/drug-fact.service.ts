import { ApiConfig, Config } from '@cmuh/api-config';
import { SqlExecute } from '@cmuh/mssql';
import { CaseVariable } from '../viewmodel';

export class DrugFactService {

    private _healthCare!: SqlExecute;
    private get healthCare(): SqlExecute {

        if (!this._healthCare) {
            this._healthCare = new SqlExecute(this.config.getDbConfig('healthCare'));
        }
        return this._healthCare;
    }

    constructor(private config: ApiConfig<Config>) { }

    public async getIsNhi(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let r = inputParams['isSelf'] ? "FALSE" : "TRUE";
        return r;
    }

    public async getDosageQty(factVariable: CaseVariable, inputParams: Record<string, any>) {
        // dosage 是開立的每次劑量,單位可能不是計價也不是服用
        // dosageQty 是本次開立的每次劑量
        // dosageUnit 本次開立的劑量單位
        // displayDoseUnit 藥局設定的服用單位
        // displayDoseRatio 服用單位劑量: 計價單位劑量 的比值
        // dosageUnitOptions 是藥品的單位選項 {unit: 單位,ratio: 比值}

        const dosage = inputParams['dosage'];

        const dosageQty = inputParams['dosageQty'];
        const dosageUnit: string = inputParams['dosageUnit'];
        const dosageUnitOptions: { unit: string, ratio: number | string }[] = inputParams['dosageUnitOptions'];
        const displayDoseUnit: string = inputParams["displayDoseUnit"];

        const targetUnit: string = factVariable.params['unit'] === undefined ? displayDoseUnit : factVariable.params['unit'];

        let orderToNhiRatio = dosageUnitOptions.find(dop => dop.unit.toLowerCase() === dosageUnit.toLowerCase());
        let nhiToRatio = dosageUnitOptions.find(dop => dop.unit.toLowerCase() === targetUnit.toLowerCase());
        if (orderToNhiRatio === undefined) {
            console.log('orderToNhiRatio is undefined')
            return dosage
        } else if (nhiToRatio === undefined) {
            console.log('nhiToRatio is undefined')
            return dosage
        } else {
            let tempDosageQty = dosageQty / Number(orderToNhiRatio.ratio); // 換成計價單位
            return tempDosageQty * Number(nhiToRatio.ratio);
        }

    }

    public async getDailyQty(factVariable: CaseVariable, inputParams: Record<string, any>) {

        const timePoint: string = inputParams["timePoint"];
        let usedTimes = Array.from(timePoint).filter(x => x === '1').length;

        let dosageQty = await this.getDosageQty(factVariable, inputParams);

        return dosageQty * usedTimes;
    }

    public async getUsedDays(factVariable: CaseVariable, inputParams: Record<string, any>) {

        const periodOrType: string = factVariable.params["for"];

        if (periodOrType === 'N') { return inputParams["usedDays"]; }
        else if (periodOrType === 'V') {
            console.log('TODO for this visit')
        } else if (periodOrType === 'E') {
            console.log('TODO for Ever')
        } else {

            let params: Record<string, any> = {}
            params['medCode'] = inputParams['medCode'];
            params['idNo'] = inputParams['idNo']

            let usedDate = await this.preparedUsedDate(periodOrType);

            params['startDate'] = usedDate.startDate;
            params['endDate'] = usedDate.endDate;
            params['isSelfList'] = [0, 1];

            const result = await this.healthCare.executeQuery('getDrugUsedQty', params)
            // console.log('result', result);
            // let list = Array.isArray(result) ? result : [];
            let r = result.usedDays === undefined ? 0 : result.usedDays            
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
    }

    public async getTotalQty(factVariable: CaseVariable, inputParams: Record<string, any>) {

        const periodOrType: string = factVariable.params["for"];

        if (periodOrType === 'N') { return inputParams['totalQty']; }
        else if (periodOrType === 'V') {
            console.log('TODO for this visit')
            return inputParams['totalQty'];
        } else if (periodOrType === 'E') {
            console.log('TODO for Ever')
            return inputParams['totalQty'];
        } else {
            let params: Record<string, any> = {}
            params['medCode'] = inputParams['medCode'];
            // console.log('MedCode:', params['medCode']);
            params['idNo'] = inputParams['idNo']
            // console.log('IdNo:', params['idNo']);
            let usedDate = await this.preparedUsedDate(periodOrType);

            params['startDate'] = usedDate.startDate;
            params['endDate'] = usedDate.endDate;
            // console.log('startDate', startDate);
            // console.log('endDate', endDate);

            // TODO 根據參數決定抓取 1.健保的量 2.自費的量 3.全都要
            params['isSelfList'] = [0, 1];

            const result = await this.healthCare.executeQuery('getDrugUsedQty', params)
            // console.log(result);
            // let list = Array.isArray(result) ? result : [];
            let r = result.usedQty === undefined ? 0 : result.usedQty
            let qty = inputParams['totalQty'];

            // list.forEach(l => { qty += l.usedQty });
            return qty + r;
        }
    }

    private async preparedUsedDate(period: string) {

        const periodNum = period.substring(0, (period.length - 1));
        const periodUnit = period[period.length - 1];

        const dateOffset = (d: Date, offset: number) => d.setDate(d.getDate() - offset);
        const monthOffset = (d: Date, offset: number) => d.setMonth(d.getMonth() - offset);
        const yearOffset = (d: Date, offset: number) => d.setFullYear(d.getFullYear() - offset);
        const fn = /D/i.test(periodUnit) ?
            dateOffset :
            /M/i.test(periodUnit) ?
                monthOffset : yearOffset;

        const startDate = new Date()
        fn(startDate, Number(periodNum));
        const endDate = new Date();

        return { startDate, endDate };
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

    public async getTotalQtyInMonth(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let params: Record<string, any> = {}
        params['medCode'] = inputParams['medCode'];
        params['idNo'] = inputParams['idNo'];

        const dateSet = (d: Date) => d.setDate(1);

        const startDate = new Date();
        dateSet(startDate);
        const endDate = new Date();

        params['startDate'] = startDate;
        params['endDate'] = endDate;

        // console.log(startDate);
        // console.log(endDate);

        const result = await this.healthCare.executeQuery('getTotalQtyInPeriod', params)
        let list = Array.isArray(result) ? result : [];
        // console.log(result)
        let qty = inputParams['totalQty'];

        list.forEach(l => { qty += l.execQty });
        return qty;
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

    public getDrugs(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let medOrderList: any[] = inputParams["medOrderList"];
        let medCode: string = inputParams["medCode"];

        let medCodeList: string[] = [];

        let filterArray = medOrderList.filter(x => { return x.medCode.trim() !== medCode.trim() });

        filterArray.forEach(x => {
            medCodeList.push(x.medCode.trim());
        });

        return medCodeList;
    }

    public getOrders(factVariable: CaseVariable, inputParams: Record<string, any>) {
        // TODO
    }

    public getFreq(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let usage: string = inputParams["usage"];
        return usage.trim();
    }

    /**
     * getAtcCodes
     * @param factVariable 
     * @param inputParams
     * 抓取其它開立藥品的 atcCode
     */
    public async getAtcCodes(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let params: { medCodeList: Array<string> } = { "medCodeList": [] }
        let result: string[] = []

        let medOrderList: any[] = inputParams["medOrderList"];
        let medCode: string = inputParams["medCode"];

        // TODO 跟藥師確認, atc code是否有要加入自己的
        let filterArray = medOrderList.filter(x => { return x.medCode.trim() !== medCode.trim() });

        filterArray.forEach(x => {
            params.medCodeList.push(x.medCode.trim());
        });
        // medOrderList.forEach(x => {
        //     params.medCodeList.push(x.medCode);
        // });

        const spResult: Array<{ medCode: string, seqNo: number, atcCode: string }> =
            await this.healthCare.executeQuery('getAtcCodes', params);

        spResult.forEach(x => {
            result.push(x.atcCode.trim())
        });
        return result;
    }

    public getWay(factVariable: CaseVariable, inputParams: Record<string, any>) {
        let way: string = inputParams["way"];
        return way;
    }




}