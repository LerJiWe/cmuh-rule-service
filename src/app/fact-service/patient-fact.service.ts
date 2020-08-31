import { ApiConfig, Config } from '@cmuh/api-config';
import { SqlExecute } from '@cmuh/mssql';
import { CaseVariable } from '../viewmodel';

export class PatientFactService {

    private _healthCare!: SqlExecute;
    private get healthCare(): SqlExecute {

        if (!this._healthCare) {
            this._healthCare = new SqlExecute(this.config.getDbConfig('healthCare'));
        }
        console.log('call the stored procedure');
        return this._healthCare;
    }

    constructor(private config: ApiConfig<Config>) { }

    public async getAge(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let birthdayString = await this.getBirthday(factVariable, inputParams);
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
        let result: number;
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
    }

    public async getMonths(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let birthdayString = await this.getBirthday(factVariable, inputParams);

        const birthday = new Date(birthdayString);
        const now = inputParams['orderTime'] === undefined ? new Date() : new Date(inputParams['orderTime'])

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

    }

    public async getDays(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let birthdayString = await this.getBirthday(factVariable, inputParams);

        const birthday = new Date(birthdayString);
        const now = new Date();

        const millisecond = now.getTime() - birthday.getTime();
        const days = (millisecond / (1000 * 60 * 60 * 24));
        return await days;
    }

    public async getBirthday(factVariable: CaseVariable, inputParams: Record<string, any>): Promise<string> {

        let params: Record<string, any> = {}
        params['empNo'] = '33878';
        params['chartNo'] = inputParams['chartNo'];

        const result = inputParams['birthday'] == undefined ?
            await this.healthCare.executeQuery('getPatientsByChartNo', params)
            : inputParams['birthday'];

        let birthdayString = result[0].birthday === undefined ? result : result[0].birthday;
        birthdayString = birthdayString.replace(/-/g, "/").replace(/T/g, " ");
        return birthdayString;
    }

    public async getGender(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let params: Record<string, any> = {}
        params['empNo'] = '33878';
        params['chartNo'] = inputParams['chartNo'];
        const result = inputParams['sex'] == undefined ?
            await this.healthCare.executeQuery('getPatientsByChartNo', params)
            : inputParams['sex'];

        const sex = result[0].sex === undefined ? result : result[0].sex;

        switch (sex) {
            case '男':
                return "1";
            case '女':
                return "2";
            default:
                return "0";
        }
    }

    public async getChartNo(factVariable: CaseVariable, inputParams: Record<string, any>) {

        return inputParams['chartNo'];
    }


    // 測試 應用 path ↓
    public async getPatientInfo(factVariable: CaseVariable, inputParams: Record<string, any>) {

        let params: Record<string, any> = {}
        params['empNo'] = '33878';
        params['chartNo'] = inputParams['chartNo'];
        const result = await this.healthCare.executeQuery('getPatientsByChartNo', params)
        let r: Record<string, any> = {}
        r['age'] = this.calAge(result, inputParams);
        r['gender'] = this.gender(result, inputParams);

        return r
    }

    private calAge(result: any, params: Record<string, any>) {
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

    private gender(result: any, params: Record<string, any>) {
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

}