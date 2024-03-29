export function range(start: number, end: number): number[] {
    return Array.from({length: end - start}, (v, k) => k + start);
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function cartesian<T>(array: T[][]): T[][] {
    return array.reduce<T[][]>((a, b) => a.flatMap(x => b.map(y => [...x, y])), [[]]);
}
