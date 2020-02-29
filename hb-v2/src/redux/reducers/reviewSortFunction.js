
export function sortNewest(a,b){
    a = a.createdAt ? a.createdAt : 0
    b = b.createdAt ? b.createdAt : 0
    return b - a;
}

export function sortOldest(a,b){
    a = a.createdAt ? a.createdAt : 0
    b = b.createdAt ? b.createdAt : 0
    return a - b;
}