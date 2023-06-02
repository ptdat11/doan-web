export const range = (min: number, max: number): number[] => {
    if (min > max)
        return [];
    
    const result = [min];
    for (let i = min + 1; i < max; i++) {
        result.push(i);
    }
    return result;
}