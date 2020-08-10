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
                "userName": "楊名棟",
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
                "高警訊藥物：請再次確認藥品用法、用量、途徑或輸注速度以避免疏失發生"
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
                "<span class=\"label label-danger\">藥品管控</span> 每次劑量  1 (Tab) 超出最極劑量 0.01 (Tab)。有疑問請洽藥劑部謝主任(264001)"
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
                "dosageQty": "每次劑量  1 (Tab) 超出最極劑量 0.01 (Tab)。"
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
                    "label": "<span class=\"label label-danger\">高警訊藥</span>",
                    "message": "高警訊藥物：請再次確認藥品用法、用量、途徑或輸注速度以避免疏失發生"
                },
                {
                    "status": false,
                    "label": "<span class=\"label label-danger\">藥品管控</span>",
                    "message": "每次劑量  1 (Tab) 超出最極劑量 0.01 (Tab)。有疑問請洽藥劑部謝主任(264001)"
                }
            ],
            "drugGuide": [
                {
                    "drugCode": 3001,
                    "guideType": 5,
                    "guideName": "成分及含量",
                    "guideDesc": "Gefitinib 250 mg/Tab 艾瑞莎膜衣錠                       \r\n"
                },
                {
                    "drugCode": 3001,
                    "guideType": 10,
                    "guideName": "藥袋中文適應症",
                    "guideDesc": "肺癌治療用藥"
                },
                {
                    "drugCode": 3001,
                    "guideType": 15,
                    "guideName": "衛福部適應症",
                    "guideDesc": "IRESSA適用於先前已接受過化學治療後，但仍局部惡化或轉移之肺腺癌病患之第二線用藥。IRESSA適用於具有EGFR-TK突變之局部侵犯性或轉移性之非小細胞肺癌(NSCLC)病患之第一線治療。"
                },
                {
                    "drugCode": 3001,
                    "guideType": 20,
                    "guideName": "英文適應症",
                    "guideDesc": "Non-small cell lung cancer"
                },
                {
                    "drugCode": 3001,
                    "guideType": 25,
                    "guideName": "成人常用劑量",
                    "guideDesc": "250-500 mg qd.\r\nDosage adjustment：Dermatologic/GI/Ocular Toxicities - hold (up to 2 wks), then\r\n\t\t\t\t\tre-instituting at 250 mg/day.\r\n\t\tConcomitant CYP3A4 induction - 500 mg/day\r\n\t\tInterstitial lung disease - discontinue."
                },
                {
                    "drugCode": 3001,
                    "guideType": 30,
                    "guideName": "兒童常用劑量",
                    "guideDesc": "not indicated."
                },
                {
                    "drugCode": 3001,
                    "guideType": 35,
                    "guideName": "肝劑量調整",
                    "guideDesc": ""
                },
                {
                    "drugCode": 3001,
                    "guideType": 40,
                    "guideName": "腎劑量調整",
                    "guideDesc": "Severe - use caution"
                },
                {
                    "drugCode": 3001,
                    "guideType": 45,
                    "guideName": "健保規範",
                    "guideDesc": "9.24.Gefitinib (如Iressa): (93/11/1-103/5/1) 附表九之一\r\n1.限單獨使用於\r\n(1)具有EGFR-TK基因突變之局部侵犯性或轉移性(即第ⅢB期或第Ⅳ期)之肺腺癌病患之第一線治療。(100/6/1)\r\n(2)先前已使用過第一線含鉑化學治療，或70歲(含)以上接受過第一線化學治療，但仍局部惡化或轉移之肺腺癌。(96/11/1、100/6/1)\r\n2.需經事前審查核准後使用：\r\n(1)用於第一線用藥：檢具確實患有肺腺癌之病理或細胞檢查報告，及EGFR-TK基因突變檢測報告。(100/6/1)\r\n(2)用於第二線以上用藥：檢具確實患有肺腺癌之病理或細胞檢查報告，並附曾經接受第一線含鉑化學治療，或70歲(含)以上接受過第一線化學治療之證明，及目前又有疾病惡化之影像診斷證明（如胸部X光、電腦斷層或其他可作為評估的影像），此影像證明以可測量（measurable）的病灶為優先，如沒有可以測量的病灶，則可評估（evaluable）的病灶亦可採用。(96/11/1、100/6/1)\r\n(3)每次申請事前審查之療程以三個月為限，每三個月需再次申請，再次申請時並需附上治療後相關臨床資料，如給藥四週後，需追蹤胸部X光、電腦斷層等影像檢查一遍，評估療效，往後每四週做胸部X光檢查，每隔八週需追蹤其作為評估藥效的影像（如胸部X光或電腦斷層）101/5/1。\r\n3.醫師每次開藥以4週為限。\r\n4.本藥品與erlotinib(如Tarceva)及afatinib(如Giotrif)不得併用。(96/8/1、103/5/1)"
                },
                {
                    "drugCode": 3001,
                    "guideType": 50,
                    "guideName": "禁忌症",
                    "guideDesc": "Severe hypersensitivity to gefitinib or other components"
                },
                {
                    "drugCode": 3001,
                    "guideType": 60,
                    "guideName": "其它注意事項",
                    "guideDesc": "1.不宜磨粉管灌藥品：以半杯水攪拌溶解(約10分鐘)後管灌。再以半杯水沖洗杯緣並管灌。"
                },
                {
                    "drugCode": 3001,
                    "guideType": 65,
                    "guideName": "藥袋中文副作用",
                    "guideDesc": "皮膚乾燥,癢疹,食慾降低,噁心,嘔吐"
                },
                {
                    "drugCode": 3001,
                    "guideType": 70,
                    "guideName": "藥袋英文副作用",
                    "guideDesc": "Diarrhea, Nausea, Vomiting, Rash, Acne, Dry Skin, Anemia, Peripheral Edema, Asthenia."
                },
                {
                    "drugCode": 3001,
                    "guideType": 75,
                    "guideName": "懷孕分級",
                    "guideDesc": "D(C)"
                },
                {
                    "drugCode": 3001,
                    "guideType": 80,
                    "guideName": "哺乳/授乳警示",
                    "guideDesc": "No Human Data-Potential Toxicity (Excretion in breast milk unknown/not recommended)"
                },
                {
                    "drugCode": 3001,
                    "guideType": 95,
                    "guideName": "用藥方法",
                    "guideDesc": "可空腹或與食物併服"
                },
                {
                    "drugCode": 3001,
                    "guideType": 100,
                    "guideName": "特別用藥指示",
                    "guideDesc": "1.本藥可能會與Rifampin、Warfarin、癲癇藥、抗黴菌藥或胃藥有相互影響，請告知醫師或藥師你是否併用。2.若您有肺部纖維化問題或肝腎疾病，請事先告知您的醫師。3.用藥前( 後)，若有懷孕、準備懷孕或哺乳，請告知醫師。4.服用此藥可能造成噁心或嘔吐的副作用，若有此問題，請與您的醫師討論。"
                },
                {
                    "drugCode": 3001,
                    "guideType": 105,
                    "guideName": "忘記服藥怎麼辦",
                    "guideDesc": "想起時，立即服用。若已接近下一次服藥時間，則只需服用下一次劑量，不可以同時服用雙倍藥量。"
                },
                {
                    "drugCode": 3001,
                    "guideType": 110,
                    "guideName": "藥品該如何存放",
                    "guideDesc": "請連同藥袋存放於緊密容器內，於室溫、乾燥處保存；避免放在孩童容易取得的地方。"
                },
                {
                    "drugCode": 3001,
                    "guideType": 115,
                    "guideName": "藥品異動原因",
                    "guideDesc": "System 0960420"
                }
            ],
            "cellAlert": {
                "dosageQty": true
            },
            "visitType": "O",
            "chartNo": "0017698346",
            "ptName": "張玉芬之男",
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
                "userName": "陳xx"
            },
            "dischargeTime": "2999-12-30T16:00:00.000Z",

            "isCare": true,
            "div": {
                "divNo": "335 ",
                "chineseName": "新生兒科"
            },
            "age": "0歲 7個月",
            "sex": "男",
            "isPremature": false,
            "headNurse": 4936,
            "remarkStr": "{\n  \"orderStatus\": \"\",\n  \"transferBed\": \"\",\n  \"riskValue\": \"Y\",\n  \"critically\": \"\",\n  \"tcpi\": \"\",\n  \"dp\": \"\",\n  \"dpDate\": \"\",\n  \"infectionNo\": 0,\n  \"infection\": \"\",\n  \"fallRisk\": \"跌倒高危\",\n  \"suicideAttempt\": \"0\",\n  \"suicideIdeation\": \"0\",\n  \"suicide\": \"N\",\n  \"dnr\": \"\",\n  \"oper\": \"N\",\n  \"exam\": \"N\",\n  \"rt\": \"\",\n  \"superDanger\": null,\n  \"shortRemark\": \"B肝, 危險,O +,電\",\n  \"isPrint\": false,\n  \"lastBldExp\": \"\",\n  \"bldSupply\": \"\",\n  \"bloodType\": \"O +\",\n  \"meal\": \"\",\n  \"eConsent\": \"電\",\n  \"pump\": \"\",\n  \"rehab\": \"N\",\n  \"examCancel\": \"N\",\n  \"isTransferEval\": \" \",\n  \"hemodialysis\": false,\n  \"clinicalTrial\": \"\",\n  \"highRisk\": \"\",\n  \"airCushionBed\": false,\n  \"electricBlanket\": false,\n  \"culture\": \"\"\n}",
            "dischargeReason": "住院中",
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
                "fallRisk": "跌倒高危",
                "suicideAttempt": "0",
                "suicideIdeation": "0",
                "suicide": "N",
                "dnr": "",
                "oper": "N",
                "exam": "N",
                "rt": "",
                "superDanger": null,
                "shortRemark": "B肝, 危險,O +,電",
                "isPrint": false,
                "lastBldExp": "",
                "bldSupply": "",
                "bloodType": "O +",
                "meal": "",
                "eConsent": "電",
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
            "userName": "楊名棟",
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
	 * 週期的數量。
	 *
	 * 經過 RuleGen，合理的值為正整數。
	 */
    quantity: number;

	/**
	 * 週期的單位。
	 *
	 * 經過 RuleGen，合理的值如下：
	 * <table>
	 *   <tr><th>合理值</th><th>意義</th></tr>
	 *   <tr align=center><td>Y</td><td>年</td></tr>
	 *   <tr align=center><td>M</td><td>月</td></tr>
	 *   <tr align=center><td>D</td><td>日</td></tr>
	 * </table>
	 */
    unit: string;
}