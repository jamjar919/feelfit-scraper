import {Path} from "../../../../../common/Path";
import {WeeklyMemberCountResponse} from "../../../../../common/ApiResponse";
import {getAjaxProvider} from "../../../../framework/provider/AjaxProviderFactory";

const { Provider, useProvider } = getAjaxProvider<WeeklyMemberCountResponse>(Path.GET_COUNT_LAST_WEEK, [])

export { Provider as MemberCountLastWeekProvider, useProvider as useMemberCountLastWeek };
