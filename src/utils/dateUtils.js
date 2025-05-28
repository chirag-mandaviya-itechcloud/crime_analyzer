export const getDateRange = (rangeKey) => {
    const endDate = new Date();
    const startDate = new Date();

    switch (rangeKey) {
        case "7days":
            startDate.setDate(endDate.getDate() - 7);
            break;
        case "30days":
            startDate.setDate(endDate.getDate() - 30);
            break;
        case "90days":
            startDate.setDate(endDate.getDate() - 90);
            break;
        case "6months":
            startDate.setMonth(endDate.getMonth() - 6);
            break;
        case "1year":
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
        default:
            startDate.setDate(endDate.getDate() - 7); // fallback to 7 days
    }

    const toIsoString = (date) => date.toISOString().split("T")[0];

    return {
        startDate: toIsoString(startDate),
        endDate: toIsoString(endDate),
    };
};
