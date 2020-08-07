export interface MedOrder {
    dosage?: number;

    medCode: string;
    medName: string;
    
    
    usage?: string;
    usageNo?: number;
    usedTimeNo?: number;

    dosageQty?: number | string;
    dosageUnit? : string;

    usedDays?: number;
    totalQty?: number,
    isSelf?: boolean;
    orderTime: Date | string | undefined;
    [key: string]: any;
}