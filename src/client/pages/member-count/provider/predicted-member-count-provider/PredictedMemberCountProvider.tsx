import {Path} from "../../../../../common/Path";
import {DailyPredictedMemberCountResponse} from "../../../../../common/ApiResponse";
import {getAjaxProvider} from "../../../../framework/provider/AjaxProviderFactory";

const { Provider, useProvider } = getAjaxProvider<DailyPredictedMemberCountResponse>(Path.GET_COUNT_PREDICTED_DAY, [])

export { Provider as PredictedMemberCountProvider, useProvider as usePredictedMemberCount };
