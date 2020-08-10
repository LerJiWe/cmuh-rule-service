import { join } from 'path';

import { ApiConfig, Config } from '@cmuh/api-config';
// import { SampleModel } from './app/sample.model';
import { VisitFactService } from './app/fact-service/visit-fact.service';
// import { PregnantService } from './app/fact-service';
// import { HttpPost } from './app/http';
// import { HttpGet } from './app/http';

class Test {
    constructor(private config: ApiConfig<Config>) { }

    private _visitFactService: VisitFactService;
    public get visitFactService(): VisitFactService {

        if (this._visitFactService) return this._visitFactService;

        this._visitFactService = new VisitFactService(this.config);
        return this._visitFactService;
    }

    // private _PregnantModel: PregnantService;
    // public get PregnantModel(): PregnantService {

    //     if (this._PregnantModel) return this._PregnantModel;

    //     this._PregnantModel = new PregnantService(this.config);
    //     return this._PregnantModel;
    // }

    public async test() {
        let result: any;
        let ageResult: any;
        let pregnantResult: any;
        let usageResult: any;

        // result = await this.labReportFactModel.getAge( { chartNo: "9999999999" } )
        // result = await this.labReportFactModel.getAgeInDays( { chartNo: "9999999999" } )
        // result = await this.labReportFactModel.getBirthday( { chartNo: "9999999999" } )
        // result = await this.labReportFactModel.getBirthday( { chartNo: "9999999999" } )
        // result = await this.labReportFactModel.getDailyDosage( { chartNo: "0000049127", dosage: '50', usage: 'QID', usedTimeNo: '4100' } );
        // result = await this.labReportFactModel.getDailyDosage({"usage":"qid", "usedTimeNo":"103", "dosage": "0"})
        // result = await this.labReportFactModel.getDailyDosageKgRate( { chartNo: "0034322813", dosage: '50', usage: 'QID', usedTimeNo: '4100' } );
        // result = await this.labReportFactModel.getDiagCode({visitNo: '8687257', visitType:'O'});
        // result = await this.labReportFactModel.getDivNo({"systemUserNo":"163"})

        // result = await this.labReportFactModel.getGender({chartNo: "0035603836"});

        // result = await this.labReportFactModel.getTotalQtyInPeriod(
        //     {
        //         totalQty: 10, period: 2190,
        //         idNo: 'B120534643', medCode: 'VERGE',
        //         visitType: 'A'
        //     })

        // result = await this.labReportFactModel.getMaxUsedDaysInPeriod(
        //     {
        //         totalQty: 10, period: 2190,
        //         usedDays: 2,
        //         idNo: 'B120534643', medCode: 'VERGE',
        //         visitType: 'A'
        //     })

        // result = await this.labReportFactModel.getDosage(
        //     {
        //         dosageQty: 100,
        //         dosageUnit: 'mla',
        //         dosageUnitOptions: [{ unit: 'ml', rate: 50 }, { unit: 'bot', rate: 5 }]
        //     })

        // result = await this.visitFactService.getDiagCode(
        //     {
        //         totalQty: 25, number: 50, visitType: 'A'
                
        //     });

        // result = await this.labReportFactModel.getTotalQtyInMonth(
        //     {
        //         visitType: 'A', totalQty: 10, medCode: 'VERGE',
        //         idNo: 'B120534643'
        //     });



        // usageResult = await this.labReportFactModel.getUsage({"usedTimeNo": "4100"});

        // result = await this.labReportFactModel.getDosageKgRate( { chartNo: "0034322813", dosage: '50', usage: 'Q3HPC', usedTimeNo: '4200' } );

        // result = await this.labReportFactModel.getCCR({visitNo: 4485847})
        // result = await this.labReportFactModel.getCCR({visitNo: 3398543})



        // console.log(ageResult);
        // console.log(pregnantResult);
        // result = await this.labReportFactModel.getDailyDosage({"usage":"qid", "usedTimeNo":"103", "dosage": "0"})

        // result = await this.labReportFactModel.getDosageKgRate({chartNo: '0034322813',dosage: '10', usedTimeNo: '4200'});
        console.log(result);
    }
}

async function test() {
    let apiConfig = new ApiConfig<Config>(join(__dirname, '../api.config.json'));
    let test = new Test(apiConfig);

    try {
        await test.test();
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

test();
