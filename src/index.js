let source = [
    'function', 'sayHello', '(', ')', '{',
    'println', '(', '"', 'hello', '"', ')',
    '}',
    'sayHello', '(', ')',
]
let position = 0

/**
 * Date:
 * Time:
 *  functionDecl: "function" identifier "(" ")" functionBody
 */
function parseFuncDecl() {
    let funcName
    let ret = []
    while (true) {
        let token = source[position]
        if (token === 'function') {
            position++
            token = source[position]
            funcName = token
            ret.push(funcName)
            position++
            continue
        } else if (token === '(') {
            console.log('debug token', token)
            position += 2
            continue
        } else if (token === '{') {
            console.log('debug token', token)
            let body = parseFuncBody()
            if (body) {
                ret.push(body)
            }
            continue
        } else if (token === '}') {
            position++
            break
        } else {
            return null
        }
    }
    return ret
}

/**
 * Date:
 * Time:
 *  functionBody: "{" functionCall "}"
 */
function parseFuncBody() {
    let ret = []
    while (true) {
        let token = source[position]
        if (token === '{') {
            position++
            let body = parseFuncCall()
            if (body) {
                ret.push(body)
            }
        } else if (token === '}') {
            // position--
            break
        }
    }
    return ret
}

/**
 * Date:
 * Time:
 * parseFuncCall: identifier "(" params? ")"
 * params: string  ","
 */
function parseFuncCall() {
    let ret = []
    let funcName = source[position]
    ret.push(funcName)
    position++
    if (source[position] === '(') {
        position++
        while (source[position] !== ')') {
            token = source[position]
            if (token === '"' || token === "'") {
            } else if (token === ',') {
            } else {
                ret.push(token)
            }
            position++
        }
        position++
    } else {
        return null
    }
    return ret
}

function parseProg(source) {
    const m = []
    let n = null
    while (true) {
        n = parseFuncDecl()
        if (n) {
            m.push(n)
            continue
        }
        n = parseFuncCall()
        if (n) {
            m.push(n)
            continue
        }
        if (n == null) {
            break
        }
        if (position > source.length) {
            break
        }
    }
    return m
}

function main() {
    const r = parseProg(source)
    console.log('debug r', JSON.stringify(r))
}

main()
