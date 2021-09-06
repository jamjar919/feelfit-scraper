const Weekday: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type DailyPredictedMemberCountResponse = {
    hour: number;
    minute: number;
    quartiles: number[];
}[]

type DailyMemberCountResponse = {
    hour: number;
    minute: number;
    count: number;
}[]

type WeeklyMemberCountResponse = {
    timestamp: string;
    count: number;
    weekday: number;
}[];

export { WeeklyMemberCountResponse, Weekday, DailyPredictedMemberCountResponse, DailyMemberCountResponse };
