import { RandomNamer, RandomType } from "../RandomNamer"


// export enum RandomType {
//     ADJECTIVE,
//     COLOR,
//     EXTENDED_COLOR,
//     GAMERTAG,
//     NOUN,
//     TEAM,
// }

function checkIfDuplicateExists(arr: any[]) {
    return new Set(arr).size !== arr.length
}

test('RandomNamer Adjective', () => {
    const list = RandomNamer(RandomType.ADJECTIVE, { toGenerate: 5 })
    expect(list.length).toStrictEqual(5)
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
})

test('RandomNamer Color', () => {
    const list = RandomNamer(RandomType.COLOR, { toGenerate: 5 })
    expect(list.length).toStrictEqual(5)
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
})

test('RandomNamer Color Unique', () => {
    const list = RandomNamer(RandomType.COLOR, { toGenerate: 7, allUnique: true })
    expect(list.length).toStrictEqual(7)
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
    expect(checkIfDuplicateExists(list)).toEqual(false)
})

test('RandomNamer extendedColor', () => {
    const list = RandomNamer(RandomType.EXTENDED_COLOR, { toGenerate: 1 })
    expect(list.length).toStrictEqual(1)
    expect(typeof list[0].id).toBe("string")
    expect(list[0].id).toEqual(list[0].id.toLowerCase())
    expect(typeof list[0].name).toBe("string")
    expect(list[0].hex).toMatch(/^#(?:[0-9a-fA-F]{3}){1,2}$/i)
    expect(typeof list[0].r).toBe("number")
    expect(list[0].r >= 0 && list[0].r <= 255).toEqual(true)
    expect(typeof list[0].g).toBe("number")
    expect(list[0].g >= 0 && list[0].g <= 255).toEqual(true)
    expect(typeof list[0].b).toBe("number")
    expect(list[0].b >= 0 && list[0].b <= 255).toEqual(true)
})

test('RandomNamer Gamertag', () => {
    const list = RandomNamer(RandomType.GAMERTAG, { toGenerate: 5, addId: true })
    expect(list.length).toStrictEqual(5)
    list.map((elem) => {
        expect(elem).toMatch(/.*#\d{4}/)
    })
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
})


test('RandomNamer Noun', () => {
    const list = RandomNamer(RandomType.NOUN, { toGenerate: 5 })
    expect(list.length).toStrictEqual(5)
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
})

test('RandomNamer Noun Unique', () => {
    const list = RandomNamer(RandomType.NOUN, { toGenerate: 7, allUnique: true })
    expect(list.length).toStrictEqual(7)
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
    expect(checkIfDuplicateExists(list)).toEqual(false)
})


test('RandomNamer Team', () => {
    const list = RandomNamer(RandomType.TEAM, { toGenerate: 5 })
    list.map(elem => {
        expect(elem).toMatch(/\w*-\w*/)
    })
    expect(list.length).toStrictEqual(5)
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
})

test('RandomNamer Team Unique', () => {
    const list = RandomNamer(RandomType.TEAM, { toGenerate: 7, allUnique: true })
    expect(list.length).toStrictEqual(7)
    list.map(elem => {
        expect(elem).toMatch(/\w*-\w*/)
    })
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
    expect(checkIfDuplicateExists(list)).toEqual(false)
})

test('RandomNamer Team Unique with ID', () => {
    const list = RandomNamer(RandomType.TEAM, { toGenerate: 7, allUnique: true, addId: true })
    expect(list.length).toStrictEqual(7)
    list.map(elem => {
        expect(elem).toMatch(/\w*-\w*#\d{4}/)
    })
    expect(list).toEqual(
        expect.arrayContaining([
            expect.any(String)
        ])
    )
    expect(checkIfDuplicateExists(list)).toEqual(false)
})