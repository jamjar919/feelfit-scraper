import {Path} from "../../../../../common/Path";
import {DailyMemberCountResponse} from "../../../../../common/ApiResponse";
import {getAjaxProvider} from "../../../../framework/provider/AjaxProviderFactory";

const { Provider, useProvider } = getAjaxProvider<DailyMemberCountResponse>(Path.GET_COUNT_DAY, [])

export { Provider as DailyMemberCountProvider, useProvider as useDailyMemberCount };
