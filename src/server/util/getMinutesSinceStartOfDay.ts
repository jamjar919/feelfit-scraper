const getMinutesSinceStartOfDay = (timestamp: Date) => timestamp.getHours() * 60 + timestamp.getMinutes();

export { getMinutesSinceStartOfDay }