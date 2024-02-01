export function valueOrDefault(data) {
    const { value = null, allowedValues = [], defaultValue = null } = data;
    return allowedValues.includes(value) ? value : defaultValue;
}

export const ResourceVisibility = {
    Private: "private",
    Unlisted: "unlisted",
    Public: "public",
};

export const OrderByFilter = {
    Newest: "newest",
    Oldest: "oldest",
    AtoZ: "atoz",
    ZtoA: "ztoa",
};

export const AccountStatus = {
    Verified: "verified",
    Unverified: "unverified",
};
