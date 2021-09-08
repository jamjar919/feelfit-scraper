/**
 * https://www.researchgate.net/publication/262931287_Color_associations_for_days_and_letters_across_different_languages
 * This is probably BS, but looks nice enough. I used the english versions.
 *
 * @param weekday The day of the week, as an int (0=Monday)
 */
const getColourForWeekday = (weekday: number): string => {
    switch (weekday) {
        case 0:
            return "#e16162";
        case 1:
            return "#ffd803";
        case 2:
            return "#078080";
        case 3:
            return "#c3f0ca";
        case 4:
            return "#3da9fc";
        case 5:
            return "#6246ea";
        case 6:
            return "#eaddcf";
        default:
            return "#000";
    }
}

export { getColourForWeekday };
