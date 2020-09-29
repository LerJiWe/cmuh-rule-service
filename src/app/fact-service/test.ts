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
        try {
          // let r = await this.visitSvc.getExamValue(f, inputParams);
          // let r = await this.visitSvc.getDivNo(f, inputParams);
          // let r = await this.visitSvc.getLicense(f, inputParams);

          // let r = await this.drugSvc.getTotalQtyInPeriod(f, inputParams);
          // let r = await this.drugSvc.getTotalQty(f, inputParams);
          // let r = await this.drugSvc.getUsedDays(f, inputParams);
          // let r = await this.drugSvc.getFreq(f, inputParams);                
          // let r = await this.drugSvc.getDrugs(f, inputParams);
          // let r = await this.drugSvc.getDosageQty(f, inputParams);
          // let r = await this.drugSvc.getAtcCodes(f, inputParams);
          // let r = await this.drugSvc.getDrugs(f, inputParams);
          let r = await this.drugSvc.getOrderTimes(f, inputParams);

          // let r = await this.patientSvc.getAge(f, inputParams);
          // let r = await this.patientSvc.getGender(f, inputParams);
          // let r = await this.patientSvc.getBloodTypeExist(f, inputParams);

          console.log(r);
        } catch (error) {
          console.log(error);
        }


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
  //   variable: "examValue",
  //   params: {
  //     "examItemNos": [
  //       2047,
  //       2152,
  //       2153
  //     ],
  //     "for": "10Y"
  //   },
  //   fullName: "examValue_for_13D"
  // },
  // {
  //   variable: "license",
  //   params: { },
  //   fullName: "license"
  // },
  // {
  //   variable: "dosage",
  //   params: {
  //     "unit": "cc"
  //   },
  //   fullName: "examValue_for_13D"
  // },
  // {
  //     variable: "age",
  //     params: {
  //         "in": "D"
  //     },
  //     fullName: ""
  // },
  // {
  //   variable: "totalQty",
  //   params: {
  //     "for": {
  //       "quantity": 2,
  //       "unit": "SS"
  //     }
  //   },
  //   fullName: "totalQty_for_100D"
  // },
  {
    variable: "orderTimes",
    params: {
      "for": {
        "quantity": 2,
        "unit": "S"
      },
      "medCodes": ["W0000142", "W0000071", "W0000072"]
    },
    fullName: "totalQty_for_100D"
  }
  // {
  //     variable: "freq",
  //     params: {},
  //     fullName: "freq"
  // }
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
      "visitNo": 163033672,
      "medType": 1310100,
      "invCode": 241,
      "medCode": "IDEGAR8",
      "antiType": "",
      "medDesc": "",
      "medName": "Degarelix 80mg/pre-filled Syringe",
      "dosageQty": 1,
      "dosageUnit": "Amp",
      "unitList": [],
      "ingredDosage": 0,
      "capacityDosage": 0,
      "volumeDosage": 0,
      "capacityRatio": 1,
      "volumeRatio": 80,
      "usageNo": 1023,
      "usage": "QD",
      "usedTimeNo": 900,
      "timePoint": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "usedTimeDesc": "09:00",
      "wayNo": 26,
      "way": "SC",
      "usedDays": 14,
      "keepTime": 0,
      "firstQty": 1,
      "totalQty": 14,
      "totalUnit": "Amp",
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
      "confirmTime": "2020-08-28T09:43:33.732Z",
      "orderTime": "2020-08-28T09:38:25.927Z",
      "startTime": "2020-08-28T09:43:33.830Z",
      "startUser": {
        "userNo": 30666,
        "userCode": "A30666",
        "userName": "楊名棟",
        "empDiv": "120",
        "saveChemo": false,
        "controlledDrugLincense": false
      },
      "endTime": "2020-09-11T09:43:33.830Z",
      "endUser": {
        "userNo": 0,
        "userCode": "",
        "userName": ""
      },
      "preExecLoc": "H5  ",
      "expandTime": "2020-08-28T09:43:33.732Z",
      "tranTime": "2020-08-28T09:43:33.732Z",
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
      "systemTime": "2020-08-28T09:43:33.732Z",
      "entityState": "added",
      "dripRateInfo": [],
      "nhiCode": "BC25882253  ",
      "feeType": 0,
      "dosageUnitNo": 60,
      "chargeUnit": "Amp",
      "dcRatio": 1,
      "dosageForms": 51,
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
        "L02BX02"
      ],
      "useFeatures": true,
      "isAlbumin": false,
      "isInsulin": false,
      "dosage": 1,
      "chargeUnitNo": 60,
      "isOrder": true,
      "isColdDrug": false,
      "isKCL": false,
      "isUB": false,
      "isChronic": false,
      "isAdvise": false,
      "isKeyMed": false,
      "isHighPrice": false,
      "isSchedule": false,
      "isLocalExec": false,
      "isMultiExpand": false,
      "usedDaysMax": 0,
      "takeUnit": "Amp",
      "fs6Phrcm": "I",
      "fs6Oaece": "",
      "isSyrup": false,
      "unitConvertType": 0,
      "displayDoseUnit": "mg",
      "displayDoseRatio": 80,
      "dosageUnitOptions": [
        {
          "unit": "Amp",
          "ratio": 1
        },
        {
          "unit": "mg",
          "ratio": 80
        }
      ],
      "doseControl": true,
      "adultDoseMax": 3,
      "adultDailyDoseMax": 3,
      "childDoseMax": 0.01,
      "childDailyDoseMax": 0.01,
      "showDrugExam": false,
      "drugSafeAlert": false,
      "isCvpOnly": false,
      "wayLock": false,
      "isHepatitisDrug": false,
      "isMoFe": false,
      "isNarcoticAnalgesics": false,
      "pregnancy": "X",
      "checkOwnSteam": false,
      "methadoneInter": false,
      "cartridge": false,
      "isWarfarin": false,
      "antifluEval": false,
      "isAneTprRx": false,
      "isTB2DrugNoNhi": false,
      "isTB2DrugNoSelf": false,
      "isFluoroQuinolone": false,
      "expireTime": "2020-08-28T09:44:33.767Z",
      "timeStart": 1598607506206,
      "checkResult": [],
      "checkMedChange": true,
      "checkHepatitis": true,
      "checkDuplicate": true,
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
          "cell-exec-allowed"
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
      "cellAlertMsg": {},
      "editable": {
        "status": true,
        "dosageQty": true,
        "dosageUnit": false,
        "way": true,
        "isSelf": true,
        "isMill": false,
        "usage": true,
        "advise": true,
        "usedDays": true,
        "firstQty": false
      },
      "repetition": [],
      "cellAlert": {},
      "checkKey": 0
    }
  ],
  "visitNo": 163033672,
  "visitType": "A",
  "chartNo": "0036084891",
  "idNo": "A100513352",
  // "idNo": "L100474153",
  "ptName": "陳正源",
  "birthday": "1968-02-05T16:00:00.000Z",
  "admissionTime": "2020-08-04T10:28:00.000Z",
  "visitDate": "2020-08-04T00:00:00.000Z",
  "bed": {
    "bedNo": 2570,
    "stationNo": "H5  ",
    "roomBed": "021"
  },
  "vsDr": {
    "userCode": "D13256",
    "userName": "林精湛"
  },
  "dischargeTime": "2999-12-30T16:00:00.000Z",
  "registerNo": 1527593,
  "isCare": true,
  "div": {
    "divNo": "310 ",
    "chineseName": "血液腫瘤科"
  },
  "age": "52歲 6個月",
  "sex": "男",
  "bmiStr": "[{\"type\":2,\"value\":68.000,\"typeName\":\"體重(公斤)\"},{\"type\":1,\"value\":160.000,\"typeName\":\"身高(公分)\"}]",
  "isPremature": false,
  "headNurse": 6883,
  "remarkStr": "{\r\n  \"orderStatus\": \"\",\r\n  \"transferBed\": \"\",\r\n  \"riskValue\": \"\",\r\n  \"critically\": \"\",\r\n  \"tcpi\": \"\",\r\n  \"dp\": \"\",\r\n  \"dpDate\": \"\",\r\n  \"infectionNo\": 0,\r\n  \"infection\": \"\",\r\n  \"fallRisk\": \"跌倒高危\",\r\n  \"suicideAttempt\": \"5\",\r\n  \"suicideIdeation\": \"0\",\r\n  \"suicide\": \"N\",\r\n  \"dnr\": \"\",\r\n  \"oper\": \"N\",\r\n  \"exam\": \"N\",\r\n  \"rt\": \"\",\r\n  \"superDanger\": null,\r\n  \"shortRemark\": \"B +,電\",\r\n  \"isPrint\": false,\r\n  \"lastBldExp\": \"\",\r\n  \"bldSupply\": \"\",\r\n  \"bloodType\": \"B +\",\r\n  \"meal\": \"\",\r\n  \"eConsent\": \"電\",\r\n  \"pump\": \"\",\r\n  \"rehab\": \"N\",\r\n  \"examCancel\": \"N\",\r\n  \"isTransferEval\": \" \",\r\n  \"hemodialysis\": false,\r\n  \"clinicalTrial\": \"\",\r\n  \"highRisk\": \"\",\r\n  \"airCushionBed\": false,\r\n  \"electricBlanket\": false,\r\n  \"culture\": \"\",\r\n  \"overdueCheck\": \"\"\r\n}",
  "dischargeReason": "住院中",
  "remark": {
    "orderStatus": "",
    "transferBed": "",
    "riskValue": "",
    "critically": "",
    "tcpi": "",
    "dp": "",
    "dpDate": "",
    "infectionNo": 0,
    "infection": "",
    "fallRisk": "跌倒高危",
    "suicideAttempt": "5",
    "suicideIdeation": "0",
    "suicide": "N",
    "dnr": "",
    "oper": "N",
    "exam": "N",
    "rt": "",
    "superDanger": null,
    "shortRemark": "B +,電",
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
    "culture": "",
    "overdueCheck": ""
  },
  "bmiRecord": [
    {
      "type": 2,
      "value": 68,
      "typeName": "體重(公斤)"
    },
    {
      "type": 1,
      "value": 160,
      "typeName": "身高(公分)"
    }
  ],
  "height": 160,
  "weight": 68,
  "teamCare": "",
  "isChild": false,
  "userNo": 30666,
  "userCode": "D0025",
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


