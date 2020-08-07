export interface CaseVariable {
    variable: string;
	params: Record<string, any | Period>;
	fullName: string;
}

/**
 * 當個案變數的參數的 key-value 的 value 是週期，如 1Y, 3M, 180D，RuleGen 階段將產生一個 Period。
 * 這是 RuleGenerator 整理出來的。
 *
 * RuleGen 階段必須負責查核，內容都是合理值。
 * EngineRun 階段可以免除髒資料防呆機制，以加快執行速度。
 */
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

export interface FactPath {
    serviceName: string,
    functionName: string,
    isCache: boolean
}