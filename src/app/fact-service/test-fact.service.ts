import { ApiConfig, Config } from '@cmuh/api-config';
import { SqlExecute } from '@cmuh/mssql';
import { CaseVariable } from '../viewmodel';
import { Almanac } from 'json-rules-engine';
import { setTimeout } from 'timers';

export class TestFactService {

    private _healthCare!: SqlExecute;
    private get healthCare(): SqlExecute {

        if (!this._healthCare) {
            this._healthCare = new SqlExecute(this.config.getDbConfig('healthCare'));
        }
        return this._healthCare;
    }

    constructor(private config: ApiConfig<Config>) { }

    private async setCacheFact(almanac: Almanac, factName: string, factValue: any, params: Record<string, any>) {

        console.log('[call the setCacheFact]');
        let cacheFact: Record<string, any> = await almanac.factValue('cacheFact') ? await almanac.factValue('cacheFact') : {};

        almanac.factValue(factName, params);

        // 舊的
        cacheFact[factName] = factValue;

        //新的
        // cacheFact[factName] = {factValue, params};

        await almanac.addRuntimeFact('cacheFact', cacheFact);
    }

    public async getTestValueFact(factVariable: CaseVariable, inputParams: Record<string, any>) {
        console.log('[測試動態抓value]');
        return 10;
    }

    public async getTestChartNo(params: Record<string, any>, almanac: Almanac) {
        console.log("It's time to get chartNo");
        return almanac.factValue('chartNo');
    }

    // test cache in one request
    public async getTestVisitNo(factVariable: CaseVariable, inputParams: Record<string, any>) {

        console.log('[call the visitNo]');

        // let visitNo = await almanac.factValue('chartNo');

        let visitNo = await inputParams['chartNo'];

        // 測試 cache fact 至不同的 engine之中
        // this.setCacheFact(almanac, 'testVisitNo', visitNo, params);
        // 測試 cache fact 至不同的 engine之中

        return visitNo;
    }

    public async getTestParams(factVariable: CaseVariable, inputParams: Record<string, any>) {

        console.log('[call the params]');

        // almanac.factValue('testParams', params);

        let result: any;

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
                result = 'D'
        }
        // this.setCacheFact(almanac, 'testParams', result);
        // setTimeout(()=>{return result}, 100)
        // setTimeout(()=>{return result}, 10000)
        return result;
    }

    public async getBigFact(params: Record<string, any>, almanac: any) {
        // console.log('[params]')
        // console.log(params)
        let result: Record<string, any> = {}
        result['string'] = params['bId'];
        result['number'] = params['test'];

        return result
    }
    public async getTestFactRuntime(factVariable: CaseVariable, inputParams: Record<string, any>) {

        console.log('getTestFactRuntime');
        console.log(factVariable);
        return factVariable.params['test'];
    }

    public async getTestNoparams(params: Record<string, any>, almanac: any) {
        console.log('[call the testnoparams]');
        return '12';
    }
}