const Weekday: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type PredictedCountResponse = {
    hour: number;
    minute: number;
    quartiles: number[];
}[]

type MemberCountResponse = {
    timestamp: string;
    count: number;
    weekday: number;
}[];

export { MemberCountResponse, Weekday, PredictedCountResponse };
