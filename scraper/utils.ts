export const parseDonations = (donations: string) => {
    if (!donations.includes("$")) {
        throw new Error(`${donations} does not contain $, so this is not from US. Remove from dataset.`);
    }

    let [raised, goal] = donations.split(" raised of ");
    raised = raised.replace("$", "").replace(",", "");

    if (!goal.includes("K")) {
        throw new Error("Raised does not contain K: " + donations);
    }
    goal = goal.replace("K", "");

    if (goal.includes(".")) {
        goal = goal.replace(".", "") + "00"
    } else {
        goal = goal + "000"
    }

    return [parseInt(raised), parseInt(goal)];
}