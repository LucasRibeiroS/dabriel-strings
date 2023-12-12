import readline from 'readline'

export const _getUserInput = (question: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise(resolve => rl.question(`${question}\n`, word => {
        rl.close()
        resolve(word)
    }))
}
