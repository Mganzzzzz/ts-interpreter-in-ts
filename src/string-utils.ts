export function isSpace(s:string) {
    return s === '\t' || s == ' ' || s === '\n'
}

export function isAlpha(s: string) {
    return 'A' <= s.toUpperCase() && s.toUpperCase() <= 'Z'
}
export function isNumber(s: string) {
    return '0' <= s.toUpperCase() && s.toUpperCase() <= '9'
}
