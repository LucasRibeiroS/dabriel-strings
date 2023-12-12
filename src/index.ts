import { _getUserInput } from './utils'

const main = async () => {
    console.log("Problema BeeCrowd #2842 'Dabriel e Suas Strings' via Programação Dinâmica ver 1. 0 - IFMG 2023")
    console.log("Desenvolvido como trabalho prático para a disciplina de Projeto e Análise de Algoritmos")
    console.log("Autores : Lucas & Maria")

    function shortestStringSubsequences(stringA: string, stringB: string): number {
        // Crie uma matriz para armazenar as comprimentos de subsequências comuns
        // para cada par de caracteres (i, j) de stringA e stringB.
        const results: number[][] = new Array(stringA.length + 1)
            .fill([])
            .map(() => new Array(stringB.length + 1).fill(0))

        // Preencha a matriz durante a execução do loop, O objetivo é encontrar a maior subsequência entre as strings A e B
        // Em cada interação, o tamanho da maior subsequencia armazenada anteriormente é reutilizado ou incrementado,
        // dessa forma, ao final das iterações, o ultimo item da matriz conterá a maior subsequencia
        for (let i = 0; i <= stringA.length; i++) { 
            if (i === 0) continue

            for (let j = 0; j <= stringB.length; j++) {
                if (j === 0) continue
                
                // Se os caracters forem iguais, aumente o tamanho da maior subsequencia possível até
                // o **caractere atual**
                if (stringA[i - 1] === stringB[j - 1]) {
                    results[i][j] = 1 + results[i - 1][j - 1]
                    continue
                }
                results[i][j] = Math.max(results[i - 1][j], results[i][j - 1])
            }
        }

        // O tamanho da menor string é dado por:
        // Tamanho(A) + Tamanho(B) - Tamanho da maior subsequência comum
        return stringA.length + stringB.length - results[stringA.length][stringB.length]
    }

    // Loop principal para interagir com o usuário
    while (true) {
        const stringA = await _getUserInput('Informe a primeira string:')
        if (stringA === 'quit') {
            break
        }
        if (stringA.length < 1 || stringA.length > 1000) {
            console.log("O tamanho da string deve maior que 1 ou menor que 1000.")
            continue
        }

        const stringB = await _getUserInput('Informe a segunda string:')
        if (stringB.length < 1 || stringB.length > 1000) {
            console.log("O tamanho da string deve maior que 1 ou menor que 1000.")
            continue
        }
        
        // Executa o algoritmo
        const size = shortestStringSubsequences(stringA, stringB)
        console.log('O tamanho da menor string que possui como subsequências as strings A e B é: ', size)
    }
}

main()