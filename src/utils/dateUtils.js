export const getDateRange = (daysAgo) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(daysAgo));

    const toIsoString = (date) => date.toISOString().split("T")[0];

    return {
        startDate: toIsoString(startDate),
        endDate: toIsoString(endDate),
    };
};
