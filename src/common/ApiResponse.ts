const Weekday: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type MemberCountResponse = {
    timestamp: string;
    count: number;
    weekday: number;
}[];

export { MemberCountResponse, Weekday };
