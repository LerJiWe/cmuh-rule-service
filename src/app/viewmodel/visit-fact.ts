import { MedOrder } from './med-order';
export interface VisitFact {
    branchNo?: number;
    visitType?: string;

    visitNo: number;
    chartNo: number | string,
    birthday?: Date | string | undefined;

    visitDate?: Date | string | undefined;
    admissionTime?: Date | string | undefined;
    dischargeTime?: Date | string | undefined;

    bed?: { bedNo: number, stationNo: string, roomBed: string };
    vsDr?: { userCode: string, userName: string };
    div?: { divNo: string, chineseName: string };

    sex?: string;
    age?: string;

    userNo?: number;
    userCode?: string;
    empDiv?: string;

    // nhiType?: string;
    // genType?: string;
    // DrNo?: number;
    // divNo?: string;
    // visitSeqNo?: string;
    // caseType?: string;
    // payType?: string;
    // partType?: string;
    medOrderList?: MedOrder[];
}

