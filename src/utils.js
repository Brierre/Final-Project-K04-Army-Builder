export const calculateTotalPoints = (units) => {
    let totalPoints = 0;
    units.forEach((unit) => {
        totalPoints += unit.points;
    });
    return totalPoints;
};