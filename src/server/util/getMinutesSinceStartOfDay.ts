const getMinutesSinceStartOfDay = (timestamp: Date) => timestamp.getUTCHours() * 60 + timestamp.getUTCMinutes();

export { getMinutesSinceStartOfDay }