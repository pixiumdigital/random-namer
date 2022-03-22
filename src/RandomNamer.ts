import { data } from "./data";
import { ExtendedColor } from "./types/ExtendedColor";

export enum RandomType {
    ADJECTIVE,
    COLOR,
    EXTENDED_COLOR,
    GAMERTAG,
    NOUN,
    TEAM,
}

type TeamList = { adjective: string[], nouns: string[] }

type ListType<T> =
    T extends RandomType.ADJECTIVE ? string[] :
    T extends RandomType.COLOR ? string[] :
    T extends RandomType.EXTENDED_COLOR ? ExtendedColor[] :
    T extends RandomType.GAMERTAG ? string[] :
    T extends RandomType.NOUN ? string[] :
    T extends RandomType.TEAM ? TeamList :
    never;

function getListByType<T extends RandomType>(type: T): ListType<T> {
    switch (type) {
        case RandomType.ADJECTIVE:
            return data.adjectives as ListType<T>
        case RandomType.COLOR:
            return data.colors as ListType<T>
        case RandomType.EXTENDED_COLOR:
            return data.extendedColors as ListType<T>
        case RandomType.GAMERTAG:
            return data.gamertag as ListType<T>
        case RandomType.NOUN:
            return data.nouns as ListType<T>
        case RandomType.TEAM:
            return { adjective: data.adjectives, nouns: data.nouns } as ListType<T>
        default:
            return data.adjectives as ListType<T>
    }
}

interface RandomNamerParam {
    toGenerate: number
    allUnique?: boolean
    addId?: boolean
}
export function RandomNamer(type: RandomType.EXTENDED_COLOR, parameters: RandomNamerParam): ExtendedColor[]
export function RandomNamer(type: Exclude<RandomType, RandomType.EXTENDED_COLOR>, parameters: RandomNamerParam): string[]
export function RandomNamer(type: RandomType, parameters: RandomNamerParam): string[] | ExtendedColor[] {

    const list = getListByType(type)
    if (parameters.allUnique) {
        if (type === RandomType.TEAM && parameters.toGenerate >= (list as TeamList).adjective.length) {
            throw new Error("Asking to generate more unique values than possible");
        } else if (parameters.toGenerate >= (list as string[] | ExtendedColor[]).length) {
            throw new Error("Asking to generate more unique values than possible");
        }
    }
    let results: string[] | ExtendedColor[] = []
    if (type === RandomType.TEAM) {
        if (parameters?.allUnique === true) {
            results = (parameters?.addId === true)
                ? randomMultiplesUnique(parameters.toGenerate, (list as TeamList).adjective).map(adj => `${adj}-${randomFromList((list as TeamList).nouns)}`).map(val => `${val}#${randomId()}`)
                : randomMultiplesUnique(parameters.toGenerate, (list as TeamList).adjective).map(adj => `${adj}-${randomFromList((list as TeamList).nouns)}`)
        } else {
            results = (parameters?.addId === true)
                ? randomMultiples(parameters.toGenerate, (list as TeamList).adjective).map(adj => `${adj}-${randomFromList((list as TeamList).nouns)}`).map(val => `${val}#${randomId()}`)
                : randomMultiples(parameters.toGenerate, (list as TeamList).adjective).map(adj => `${adj}-${randomFromList((list as TeamList).nouns)}`)
        }
    } else {
        if (parameters?.allUnique === true) {
            results = (parameters?.addId === true && type !== RandomType.EXTENDED_COLOR)
                ? randomMultiplesUnique(parameters.toGenerate, (list as string[])).map(val => `${val}#${randomId()}`)
                : randomMultiplesUnique(parameters.toGenerate, (list as string[] | ExtendedColor[]))
        } else {
            results = (parameters?.addId === true && type !== RandomType.EXTENDED_COLOR)
                ? randomMultiples(parameters.toGenerate, (list as string[])).map(val => `${val}#${randomId()}`)
                : randomMultiples(parameters.toGenerate, (list as string[] | ExtendedColor[]))
        }
    }
    return results
}


const randomFromList = (list: any[]) => {
    return list[Math.floor(Math.random() * list.length)]
}

const randomMultiples = (toGenerate: number, list: any[]) => {
    let results: any[] = []
    for (let index = 0; index < toGenerate; index++) {
        results.push(randomFromList(list))
    }
    return results
}

const randomMultiplesUnique = (toGenerate: number, list: any[]) => {
    let currentResults: Record<string, string> = {}
    while (Object.keys(currentResults).length < toGenerate) {
        const element = randomFromList(list)
        if (!currentResults[element]) {
            currentResults[element] = element
        }
    }
    return Object.values(currentResults)
}

/**
 * Generates a random ID (discord style)
 * @returns string
 */
export const randomId = () => {
    return Math.random().toString().substring(2, 6)
}