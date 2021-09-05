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

type PredictedMemberCountResponse = {
    timestamp: string;
    count: number;
    range: {
        min: number;
        max: number;
    };
    isPredicted: boolean;
}[]

export { MemberCountResponse, PredictedMemberCountResponse, Weekday, PredictedCountResponse };
