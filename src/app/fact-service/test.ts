import { PatientFactService } from './patient-fact.service';
import { DrugFactService } from './drug-fact.service';
import { VisitFactService } from './visit-fact.service';
import { ApiConfig, Config } from '@cmuh/api-config';
import { join } from 'path';
import { CaseVariable } from '../viewmodel';
import { VisitFact, MedOrder } from '../viewmodel';

// import {} from '../../../'

class Test {
    constructor(private visitSvc: VisitFactService, private drugSvc: DrugFactService, private patientSvc: PatientFactService) { }
    public async testService(factVariables: CaseVariable[], visitFact: VisitFact) {

        let medOrderList: MedOrder[] = (!visitFact.medOrderList) ? [] : visitFact.medOrderList;

        for (let medOrder of medOrderList) {
            let inputParams = { ...medOrder, ...visitFact };

            for (let f of factVariables) {
                console.log(f.params)
                // let r = await this.visitSvc.getExamValue(f, inputParams);
                // let r = await this.visitSvc.getDivNo(f, inputParams);

                // let r = await this.drugSvc.getTotalQtyInPeriod(f, inputParams);
                // let r = await this.drugSvc.getTotalQty(f, inputParams);
                // let r = await this.drugSvc.getDrugs(f, inputParams);
                let r = await this.drugSvc.getDosageQty(f, inputParams);
                // let r = await this.drugSvc.getAtcCodes(f, inputParams);

                // let r = await this.patientSvc.getAge(f, inputParams);
                // let r = await this.patientSvc.getGender(f, inputParams);
                console.log(r);
            }
            
        }


    }
}

// const config = new ApiConfig<Config>(join(__dirname, '../../api.config.json'));
const config = new ApiConfig<Config>(join(__dirname, '../../../api.config.json'));
let visitSvc = new VisitFactService(config);
let drugSvc = new DrugFactService(config);
let patientSvc = new PatientFactService(config);

// 測試資料區 *********************************************

// const facts: CaseVariable[] = [
//     {
//         name: "age",
//         params: { "in": "D", },
//         fullName: "ageInD"
//     }, {
//         name: "age",
//         params: { "in": "M" },
//         fullName: "ageInM"
//     },
//     {
//         name: "age",
//         params: { "in": "Y" },
//         fullName: "ageInM"
//     }
// ]

// const facts: CaseVariable[] = [
//     {
//         variable: "usedDaysInPeriod",
//         params: { "period": 400, "unit": "day", "for":"13D" },
//         fullName: "usedDaysInPeriodFor400day"
//     }
// ]

// const facts: CaseVariable[] = [
//     {
//         variable: "totalQty",
//         params: { "for": "13Y" },
//         fullName: "totalQty_for_13D"
//     }
// ]


const facts: CaseVariable[] = [
    // {
    //     variable: "examValue",
    //     params: {
    //         "examItemNos": [
    //             2047,
    //             2152,
    //             2153
    //         ],
    //         "for": "10Y"
    //     },
    //     fullName: "examValue_for_13D"
    // },
    {
        variable: "dosage",
        params: {
            "unit": "cc"
        },
        fullName: "examValue_for_13D"
    }
]

// const facts: CaseVariable[] = [
//     {
//         name: "examValue",
//         params: {
//             "examItemNos": [
//                 2047,
//                 2152,
//                 2153
//             ], "for": "2Y", "invalidValue": 20000
//         },
//         fullName: "divNoKindV"
//     }
// ]

const visitFact = {
    "medOrderList": [
        {
            "orderNo": 0,
            "orderTimeStamp": "",
            "orderSource": 0,
            "groupNo": 0,
            "seqNo": 0,
            "visitNo": 136198811,
            "medType": 1310100,
            "invCode": 4005,
            "medCode": "TIVABRA",
            "antiType": "",
            "medDesc": "",
            "medName": "Ivabradine 5mg/Tab",
            "dosageQty": 100,
            "dosageUnit": "mg",
            "unitList": [],
            "ingredDosage": 0,
            "capacityDosage": 0,
            "volumeDosage": 0,
            "capacityRatio": 1,
            "volumeRatio": 5,
            "usageNo": 1000,
            "usage": "BID",
            "usedTimeNo": 21,
            "timePoint": "000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "usedTimeDesc": "",
            "wayNo": 25,
            "way": "PO",
            "usedDays": 14,
            "keepTime": 0,
            "firstQty": 2,
            "totalQty": 28,
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
            "confirmTime": "2020-08-03T08:50:49.400Z",
            "orderTime": "2020-08-03T08:57:17.828Z",
            "startTime": "2020-08-03T08:57:17.828Z",
            "startUser": {
                "userNo": 30666,
                "userCode": "A30666",
                "userName": "楊名棟",
                "empDiv": "120",
                "saveChemo": false,
                "controlledDrugLincense": false
            },
            "endTime": "2020-08-17T08:57:14.178Z",
            "endUser": {
                "userNo": 0,
                "userCode": "",
                "userName": ""
            },
            "preExecLoc": "B7  ",
            "expandTime": "2020-08-03T08:50:49.400Z",
            "tranTime": "2020-08-03T08:50:49.400Z",
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
            "controlDrug": 0,
            "medStatus": 10,
            "systemUserNo": 30666,
            "systemTime": "2020-08-03T08:50:49.400Z",
            "entityState": "added",
            "dripRateInfo": [],
            "nhiCode": "BC26097100  ",
            "feeType": 0,
            "dosageUnitNo": 10,
            "chargeUnit": "Tab",
            "dcRatio": 1,
            "dosageForms": 1,
            "highAlert": 0,
            "isInterReview": false,
            "isOpdOrder": false,
            "isAdmOrder": true,
            "isEmgOrder": false,
            "isCtOrder": false,
            "isPriorReview": false,
            "priorReviewType": 0,
            "isRelation": false,
            "hints": [],
            "atcCode": [
                "C01EB17"
            ],
            "useFeatures": true,
            "dosage": 1,
            "chargeUnitNo": 10,
            "fs6Phrcm": "O",
            "unitConvertType": 1,
            "displayDoseUnit": "mg",
            "displayDoseRatio": 5,
            "dosageUnitOptions": [
                {
                    "unit": "Tab",
                    "ratio": 1
                },
                {
                    "unit": "mg",
                    "ratio": 5
                },
                {
                    "unit": "cc",
                    "ratio": 500
                }
            ],
            "doseControl": true,
            "adultDoseMax": 1.5,
            "adultDailyDoseMax": 3,
            "childDoseMax": 1,
            "childDailyDoseMax": 2,
            "wayLock": true,
            "pregnancy": "C(D)",
            "expireTime": "2020-08-03T08:51:49.422Z",
            "timeStart": 1596444361915,
            "checkResult": [],
            "checkMedChange": true,
            "checkHepatitis": true,
            "checkDuplicate": true,
            "checkAllopurinol": true,
            "added": true,
            "rowClass": [
                "row-new",
                "row-selected"
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
                    "cell-exec-allowed"
                ],
                "dosageUnit": [
                    "dt-cell",
                    "dt-dosage-unit",
                    "cell-exec-allowed"
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
            "cellAlertMsg": {},
            "editable": {
                "status": true,
                "dosageQty": true,
                "dosageUnit": true,
                "way": false,
                "isSelf": true,
                "isMill": false,
                "usage": true,
                "advise": true,
                "usedDays": true,
                "firstQty": false
            },
            "repetition": [],
            "_selected": true,
            "tipList": [],
            "cellAlert": {}
        }
    ],
    "visitNo": 136198811,
    "visitType": "A",
    "chartNo": "0032333947",
    "ptName": "顧芷菱",
    "birthday": "2015-12-24T16:00:00.000Z",
    "admissionTime": "2019-09-27T02:54:00.000Z",
    "visitDate": "2019-09-27T00:00:00.000Z",
    "bed": {
        "bedNo": 793,
        "stationNo": "B7  ",
        "roomBed": "021"
    },
    "vsDr": {
        "userCode": "D22881",
        "userName": "鄒曉玲"
    },
    "dischargeTime": "2999-12-30T16:00:00.000Z",
    "registerNo": 1456501,
    "isCare": true,
    "div": {
        "divNo": "200 ",
        "chineseName": "中醫部"
    },
    "age": "4歲 7個月",
    "sex": "女",
    "bmiStr": "[{\"type\":2,\"value\":11.200,\"typeName\":\"體重(公斤)\"},{\"type\":1,\"value\":92.000,\"typeName\":\"身高(公分)\"}]",
    "isPremature": false,
    "headNurse": 12666,
    "remarkStr": "{   \"orderStatus\": \"未核\",   \"transferBed\": \"\",   \"riskValue\": \"\",   \"critically\": \"\",   \"tcpi\": \"\",   \"dp\": \"\",   \"dpDate\": \"\",   \"infectionNo\": 0,   \"infection\": \"\",   \"fallRisk\": \"\",   \"suicideAttempt\": \"0\",   \"suicideIdeation\": \"0\",   \"suicide\": \"N\",   \"dnr\": \"\",   \"oper\": \"N\",   \"exam\": \"N\",   \"rt\": \"\",   \"superDanger\": null,   \"shortRemark\": \"TB個案, 未核,B +,電\",   \"isPrint\": false,   \"lastBldExp\": \"\",   \"bldSupply\": \"\",   \"bloodType\": \"B +\",   \"meal\": \"\",   \"eConsent\": \"電\",   \"pump\": \"\",   \"rehab\": \"N\",   \"examCancel\": \"N\",   \"isTransferEval\": \" \",   \"hemodialysis\": false,   \"clinicalTrial\": \"\",   \"highRisk\": \"\",   \"airCushionBed\": false,   \"electricBlanket\": false,   \"culture\": \"\" }",
    "dischargeReason": "住院中",
    "remark": {
        "orderStatus": "未核",
        "transferBed": "",
        "riskValue": "",
        "critically": "",
        "tcpi": "",
        "dp": "",
        "dpDate": "",
        "infectionNo": 0,
        "infection": "",
        "fallRisk": "",
        "suicideAttempt": "0",
        "suicideIdeation": "0",
        "suicide": "N",
        "dnr": "",
        "oper": "N",
        "exam": "N",
        "rt": "",
        "superDanger": null,
        "shortRemark": "TB個案, 未核,B +,電",
        "isPrint": false,
        "lastBldExp": "",
        "bldSupply": "",
        "bloodType": "B +",
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
    "bmiRecord": [
        {
            "type": 2,
            "value": 11.2,
            "typeName": "體重(公斤)"
        },
        {
            "type": 1,
            "value": 92,
            "typeName": "身高(公分)"
        }
    ],
    "height": null,
    "weight": null,
    "isChild": false,
    "userNo": 30666,
    "userCode": "A30666",
    "userName": "楊名棟",
    "empDiv": "120",
    "saveChemo": false,
    "controlledDrugLincense": false,
    "branchNo": 1
}

// const input = { orderTime: "2020/01/31", birthday: "2000/02/02" }
// const input = { medCode: "OFLURBI", idNo: "C100692449", "totalQty": 110, "usedDays": 10 } // 累積量相關
// const input = { chartNo: "0017698346", vsDr: { userCode: "D0312" }, userCode: "A33878" }

new Test(visitSvc, drugSvc, patientSvc).testService(facts, visitFact);

// 測試正則

// const testStrings = [
//     "a88D",
//     "815s518d",
//     "8159s1D",
//     "88DSGE",
//     "88D"
// ]
// const regS = "^[1-9][0-9]*D$"


