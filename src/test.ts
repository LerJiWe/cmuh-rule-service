import { join } from 'path';

import { ApiConfig, Config } from '@cmuh/api-config';
import { FactServiceSet, FactProviderRuntime, FactProviderDynamic } from './index';
// import { SampleModel } from './app/sample.model';
import { VisitFactService } from './app/fact-service/visit-fact.service';
// import { PregnantService } from './app/fact-service';
// import { HttpPost } from './app/http';
// import { HttpGet } from './app/http';

class Test {
    constructor(private config: ApiConfig<Config>) { }

    private factService: FactServiceSet = new FactServiceSet(this.config);

    private factProvider: FactProviderRuntime = new FactProviderRuntime(this.factService);

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
        console.log('start test');
        let result: any;
        let ageResult: any;
        let pregnantResult: any;
        let usageResult: any;

        let factContent: CaseVariable[] = [
            {
                "variable": "totalQty",
                "params": {
                    "for": "N"
                },
                "fullName": "totalQty_for_N"
            },
            {
                "variable": "freq",
                "params": {},
                "fullName": "freq"
            },
            {
                "variable": "usedDays",
                "params": {
                    "for": "N"
                },
                "fullName": "usedDays_for_N"
            }
        ]


        // let requireFact: Array<{ variable: string }> = factContent.map((x: CaseVariable) => { x.variable });
        let inputParams =
        {
            "indication": [],
            "orderNo": 0,
            "orderTimeStamp": "",
            "orderSource": 0,
            "groupNo": 0,
            "seqNo": 0,
            "visitNo": 136137279,
            "medType": 1310100,
            "invCode": 3001,
            "medCode": "TOSELT21",
            "antiType": "",
            "medDesc": "",
            "medName": "Gefitinib 250mg/Tab",
            "dosageQty": 1,
            "dosageUnit": "Tab",
            "unitList": [],
            "ingredDosage": 0,
            "capacityDosage": 0,
            "volumeDosage": 0,
            "capacityRatio": 1,
            "volumeRatio": 250,
            "usageNo": 0,
            "usage": "QD",
            "usedTimeNo": 11,
            "timePoint": "",
            "usedTimeDesc": "",
            "wayNo": 0,
            "way": "PO",
            "usedDays": 30,
            "keepTime": 0,
            "firstQty": 0,
            "totalQty": 100,
            "totalUnit": "Tab",
            "ingredQty": 0,
            "ingredRatio": 0,
            "isSelf": false,
            "isMill": false,
            "isOnCost": false,
            "canMill": false,
            "canHalf": false,
            "isMulti": false,
            "advise": "",
            "confirmUser": {
                "userNo": 0,
                "userCode": "",
                "userName": ""
            },
            "confirmTime": "2020-04-30T07:41:30.304Z",
            "orderTime": "2020-12-30T07:37:59.700Z",
            "startTime": "2020-04-30T07:41:30.800Z",
            "startUser": {
                "userNo": 30666,
                "userCode": "A30666",
                "userName": "?????????",
                "empDiv": "120",
                "saveChemo": false,
                "controlledDrugLincense": false
            },
            "endTime": "2020-05-14T07:41:30.800Z",
            "endUser": {
                "userNo": 0,
                "userCode": "",
                "userName": ""
            },
            "preExecLoc": "NICU",
            "expandTime": "2020-04-30T07:41:30.304Z",
            "tranTime": "2020-04-30T07:41:30.304Z",
            "tranStatus": 0,
            "statusName": "",
            "stockNo": "",
            "orderLoc": "",
            "chargeType": "",
            "isErAdd": false,
            "isOpAdd": false,
            "isChdAdd": false,
            "registerNo": 0,
            "linkNo": 0,
            "masterNo": 0,
            "detailNo": 0,
            "controlDrug": 42,
            "medStatus": 10,
            "systemUserNo": 30666,
            "systemTime": "2020-04-30T07:41:30.304Z",
            "entityState": "added",
            "dripRateInfo": [],
            "nhiCode": "BC23808100  ",
            "feeType": 2,
            "dosageUnitNo": 10,
            "chargeUnit": 10,
            "dcRatio": 1,
            "dosageForms": 1,
            "highAlert": 0,
            "isInterReview": false,
            "isOpdOrder": false,
            "isAdmOrder": true,
            "isEmgOrder": false,
            "isCtOrder": true,
            "isPriorReview": false,
            "priorReviewType": 0,
            "isRelation": false,
            "hints": [],
            "atcCode": "L01XE02",
            "isInsulin": false,
            "isAlbumin": false,
            "isSyrup": false,
            "showDrugExam": false,
            "drugSafeAlert": false,
            "wayLock": true,
            "isHepatitisDrug": false,
            "isMoFe": false,
            "dosageUnitOptions": [
                {
                    "unit": "Tab",
                    "rate": 1
                },
                {
                    "unit": "mg",
                    "rate": 250
                }
            ],
            "dosageLimit": {
                "isProhibit": true,
                "dosageMaxAdult": 2,
                "dosageMaxChild": 0.01,
                "dailyMaxAdult": 2,
                "dailyMaxChild": 0.01
            },
            "isNarcoticAnalgesics": false,
            "cautionMessage": [
                "???????????????????????????????????????????????????????????????????????????????????????????????????"
            ],
            "isHAMPA": false,
            "checkOwnSteam": false,
            "isMethadone": false,
            "cartridge": false,
            "isWF": false,
            "isMV": false,
            "antifluEval": false,
            "isAneTprRx": false,
            "isTB2Drug": false,
            "isTB2DrugNoNhi": false,
            "isTB2DrugNoSelf": false,
            "usedDaysMax": 999,
            "expireTime": "2020-04-30T07:42:30.600Z",
            "timeStart": 1588232280810,
            "checkResult": [
                "<span class=\"label label-danger\">????????????</span> ????????????  1 (Tab) ?????????????????? 0.01 (Tab)????????????????????????????????????(264001)"
            ],
            "checkMedChange": true,
            "checkHepatitis": true,
            "checkDuplicate": true,
            "checkAllopurinol": true,
            "added": true,
            "rowClass": [
                "row-new"
            ],
            "cellClass": {
                "status": [
                    "dt-cell",
                    "dt-status"
                ],
                "medName": [
                    "dt-cell",
                    "dt-name"
                ],
                "dosageInUnit": [
                    "dt-cell",
                    "dt-dosage-in-unit"
                ],
                "way": [
                    "dt-cell",
                    "dt-way",
                    "cell-exec-not-allowed"
                ],
                "usage": [
                    "dt-cell",
                    "dt-usage",
                    "cell-exec-allowed"
                ],
                "isSelf": [
                    "dt-cell",
                    "dt-self"
                ],
                "isMill": [
                    "dt-cell",
                    "dt-mill",
                    "cell-exec-not-allowed"
                ],
                "advise": [
                    "dt-cell",
                    "dt-advise",
                    "cell-exec-allowed"
                ],
                "startTime": [
                    "dt-cell",
                    "dt-start-time"
                ],
                "endTime": [
                    "dt-cell",
                    "dt-end-time"
                ],
                "totalQty": [
                    "dt-cell",
                    "dt-total-qty"
                ],
                "totalUnit": [
                    "dt-cell",
                    "dt-total-unit"
                ],
                "medCode": [
                    "dt-cell",
                    "dt-med-code"
                ],
                "dosageQty": [
                    "dt-cell",
                    "dt-dosage-qty",
                    "cell-data-invalid",
                    "cell-exec-allowed"
                ],
                "dosageUnit": [
                    "dt-cell",
                    "dt-dosage-unit",
                    "cell-exec-not-allowed"
                ],
                "usedDays": [
                    "dt-cell",
                    "dt-used-days",
                    "cell-exec-allowed"
                ],
                "firstQty": [
                    "dt-cell",
                    "dt-first-qty",
                    "cell-exec-not-allowed"
                ]
            },
            "cellAlertMsg": {
                "dosageQty": "????????????  1 (Tab) ?????????????????? 0.01 (Tab)???"
            },
            "editable": {
                "status": true,
                "dosageQty": true,
                "dosageUnit": false,
                "way": false,
                "isSelf": true,
                "usage": true,
                "advise": true,
                "usedDays": true,
                "firstQty": false
            },
            "repetition": [],
            "tipList": [
                {
                    "label": "<span class=\"label label-danger\">????????????</span>",
                    "message": "???????????????????????????????????????????????????????????????????????????????????????????????????"
                },
                {
                    "status": false,
                    "label": "<span class=\"label label-danger\">????????????</span>",
                    "message": "????????????  1 (Tab) ?????????????????? 0.01 (Tab)????????????????????????????????????(264001)"
                }
            ],
            "drugGuide": [
                {
                    "drugCode": 3001,
                    "guideType": 5,
                    "guideName": "???????????????",
                    "guideDesc": "Gefitinib 250 mg/Tab ??????????????????                       \r\n"
                },
                {
                    "drugCode": 3001,
                    "guideType": 10,
                    "guideName": "?????????????????????",
                    "guideDesc": "??????????????????"
                },
                {
                    "drugCode": 3001,
                    "guideType": 15,
                    "guideName": "??????????????????",
                    "guideDesc": "IRESSA???????????????????????????????????????????????????????????????????????????????????????????????????????????????IRESSA???????????????EGFR-TK?????????????????????????????????????????????????????????(NSCLC)???????????????????????????"
                },
                {
                    "drugCode": 3001,
                    "guideType": 20,
                    "guideName": "???????????????",
                    "guideDesc": "Non-small cell lung cancer"
                },
                {
                    "drugCode": 3001,
                    "guideType": 25,
                    "guideName": "??????????????????",
                    "guideDesc": "250-500 mg qd.\r\nDosage adjustment???Dermatologic/GI/Ocular Toxicities - hold (up to 2 wks), then\r\n\t\t\t\t\tre-instituting at 250 mg/day.\r\n\t\tConcomitant CYP3A4 induction - 500 mg/day\r\n\t\tInterstitial lung disease - discontinue."
                },
                {
                    "drugCode": 3001,
                    "guideType": 30,
                    "guideName": "??????????????????",
                    "guideDesc": "not indicated."
                },
                {
                    "drugCode": 3001,
                    "guideType": 35,
                    "guideName": "???????????????",
                    "guideDesc": ""
                },
                {
                    "drugCode": 3001,
                    "guideType": 40,
                    "guideName": "???????????????",
                    "guideDesc": "Severe - use caution"
                },
                {
                    "drugCode": 3001,
                    "guideType": 45,
                    "guideName": "????????????",
                    "guideDesc": "9.24.Gefitinib (???Iressa): (93/11/1-103/5/1) ???????????????\r\n1.??????????????????\r\n(1)??????EGFR-TK??????????????????????????????????????????(?????????B???????????????)???????????????????????????????????????(100/6/1)\r\n(2)???????????????????????????????????????????????????70???(???)?????????????????????????????????????????????????????????????????????????????????(96/11/1???100/6/1)\r\n2.????????????????????????????????????\r\n(1)???????????????????????????????????????????????????????????????????????????????????????EGFR-TK???????????????????????????(100/6/1)\r\n(2)?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????70???(???)????????????????????????????????????????????????????????????????????????????????????????????????????????????X???????????????????????????????????????????????????????????????????????????????????????measurable????????????????????????????????????????????????????????????????????????evaluable???????????????????????????(96/11/1???100/6/1)\r\n(3)?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????X?????????????????????????????????????????????????????????????????????????????????X???????????????????????????????????????????????????????????????????????????X?????????????????????101/5/1???\r\n3.?????????????????????4????????????\r\n4.????????????erlotinib(???Tarceva)???afatinib(???Giotrif)???????????????(96/8/1???103/5/1)"
                },
                {
                    "drugCode": 3001,
                    "guideType": 50,
                    "guideName": "?????????",
                    "guideDesc": "Severe hypersensitivity to gefitinib or other components"
                },
                {
                    "drugCode": 3001,
                    "guideType": 60,
                    "guideName": "??????????????????",
                    "guideDesc": "1.???????????????????????????????????????????????????(???10??????)???????????????????????????????????????????????????"
                },
                {
                    "drugCode": 3001,
                    "guideType": 65,
                    "guideName": "?????????????????????",
                    "guideDesc": "????????????,??????,????????????,??????,??????"
                },
                {
                    "drugCode": 3001,
                    "guideType": 70,
                    "guideName": "?????????????????????",
                    "guideDesc": "Diarrhea, Nausea, Vomiting, Rash, Acne, Dry Skin, Anemia, Peripheral Edema, Asthenia."
                },
                {
                    "drugCode": 3001,
                    "guideType": 75,
                    "guideName": "????????????",
                    "guideDesc": "D(C)"
                },
                {
                    "drugCode": 3001,
                    "guideType": 80,
                    "guideName": "??????/????????????",
                    "guideDesc": "No Human Data-Potential Toxicity (Excretion in breast milk unknown/not recommended)"
                },
                {
                    "drugCode": 3001,
                    "guideType": 95,
                    "guideName": "????????????",
                    "guideDesc": "???????????????????????????"
                },
                {
                    "drugCode": 3001,
                    "guideType": 100,
                    "guideName": "??????????????????",
                    "guideDesc": "1.??????????????????Rifampin???Warfarin????????????????????????????????????????????????????????????????????????????????????????????????2.??????????????????????????????????????????????????????????????????????????????3.?????????( ???)????????????????????????????????????????????????????????????4.???????????????????????????????????????????????????????????????????????????????????????????????????"
                },
                {
                    "drugCode": 3001,
                    "guideType": 105,
                    "guideName": "?????????????????????",
                    "guideDesc": "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                },
                {
                    "drugCode": 3001,
                    "guideType": 110,
                    "guideName": "?????????????????????",
                    "guideDesc": "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                },
                {
                    "drugCode": 3001,
                    "guideType": 115,
                    "guideName": "??????????????????",
                    "guideDesc": "System 0960420"
                }
            ],
            "cellAlert": {
                "dosageQty": true
            },
            "visitType": "O",
            "chartNo": "0017698346",
            "ptName": "???????????????",
            "birthday": "2019-09-22T16:00:00.000Z",
            "admissionTime": "2019-09-23T10:50:00.000Z",
            "visitDate": "2019-09-23T00:00:00.000Z",
            "bed": {
                "bedNo": 3022,
                "stationNo": "NICU",
                "roomBed": "01 "
            },
            "vsDr": {
                "userCode": "D33159",
                "userName": "???xx"
            },
            "dischargeTime": "2999-12-30T16:00:00.000Z",

            "isCare": true,
            "div": {
                "divNo": "335 ",
                "chineseName": "????????????"
            },
            "age": "0??? 7??????",
            "sex": "???",
            "isPremature": false,
            "headNurse": 4936,
            "remarkStr": "{\n  \"orderStatus\": \"\",\n  \"transferBed\": \"\",\n  \"riskValue\": \"Y\",\n  \"critically\": \"\",\n  \"tcpi\": \"\",\n  \"dp\": \"\",\n  \"dpDate\": \"\",\n  \"infectionNo\": 0,\n  \"infection\": \"\",\n  \"fallRisk\": \"????????????\",\n  \"suicideAttempt\": \"0\",\n  \"suicideIdeation\": \"0\",\n  \"suicide\": \"N\",\n  \"dnr\": \"\",\n  \"oper\": \"N\",\n  \"exam\": \"N\",\n  \"rt\": \"\",\n  \"superDanger\": null,\n  \"shortRemark\": \"B???, ??????,O +,???\",\n  \"isPrint\": false,\n  \"lastBldExp\": \"\",\n  \"bldSupply\": \"\",\n  \"bloodType\": \"O +\",\n  \"meal\": \"\",\n  \"eConsent\": \"???\",\n  \"pump\": \"\",\n  \"rehab\": \"N\",\n  \"examCancel\": \"N\",\n  \"isTransferEval\": \" \",\n  \"hemodialysis\": false,\n  \"clinicalTrial\": \"\",\n  \"highRisk\": \"\",\n  \"airCushionBed\": false,\n  \"electricBlanket\": false,\n  \"culture\": \"\"\n}",
            "dischargeReason": "?????????",
            "remark": {
                "orderStatus": "",
                "transferBed": "",
                "riskValue": "Y",
                "critically": "",
                "tcpi": "",
                "dp": "",
                "dpDate": "",
                "infectionNo": 0,
                "infection": "",
                "fallRisk": "????????????",
                "suicideAttempt": "0",
                "suicideIdeation": "0",
                "suicide": "N",
                "dnr": "",
                "oper": "N",
                "exam": "N",
                "rt": "",
                "superDanger": null,
                "shortRemark": "B???, ??????,O +,???",
                "isPrint": false,
                "lastBldExp": "",
                "bldSupply": "",
                "bloodType": "O +",
                "meal": "",
                "eConsent": "???",
                "pump": "",
                "rehab": "N",
                "examCancel": "N",
                "isTransferEval": " ",
                "hemodialysis": false,
                "clinicalTrial": "",
                "highRisk": "",
                "airCushionBed": false,
                "electricBlanket": false,
                "culture": ""
            },
            "bmiRecord": "",
            "height": null,
            "weight": null,
            "isChild": true,
            "userNo": 30666,
            "userCode": "A30666",
            "userName": "?????????",
            "empDiv": "120",
            "saveChemo": false,
            "controlledDrugLincense": false,
            "branchNo": 1
        }

        let catchFact = {};

        result = await this.factProvider.getFact(factContent, inputParams, catchFact)

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

interface CaseVariable {
    variable: string;
    params: Record<string, any | Period>;
    fullName: string;
}
interface Period {

	/**
	 * ??????????????????
	 *
	 * ?????? RuleGen??????????????????????????????
	 */
    quantity: number;

	/**
	 * ??????????????????
	 *
	 * ?????? RuleGen????????????????????????
	 * <table>
	 *   <tr><th>?????????</th><th>??????</th></tr>
	 *   <tr align=center><td>Y</td><td>???</td></tr>
	 *   <tr align=center><td>M</td><td>???</td></tr>
	 *   <tr align=center><td>D</td><td>???</td></tr>
	 * </table>
	 */
    unit: string;
}