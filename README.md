# Random Namer

This project aims to simply provide random usernames, team names, gamertags, adjectives, colors to use in testing data.

## Installation

```ts
yarn install
```

## Usage

```ts
import { RandomNamer, RandomType } from "@pixium-digital/random-namer"

const list = RandomNamer(RandomType.TEAM, { toGenerate: 3, allUnique: true, addId: true })
// ['voiceless-sea#4457', 'delicate-star#6563', 'even-nest#9988']

const list = RandomNamer(RandomType.GAMERTAG, { toGenerate: 2 })
// ['The Best Yoda', 'I_Cant_Play']
```

Here is the list of random types that can be passed:

```ts
export enum RandomType {
    ADJECTIVE,
    COLOR,
    EXTENDED_COLOR,
    GAMERTAG,
    NOUN,
    TEAM,
}
```

Here are the parameters available to pass to the function

```ts
{
    toGenerate: number // Number of items to generate
    allUnique?: boolean // Should the generated items be unique?
    addId?: boolean // Should the items be apended with an ID (discord like) #3949
}
```

## Others

### Extended Colors

If you are suing the `RandomType.EXTENDED_COLOR` you will get a array of ExtendedColors instead of strings.

ExtendedColor are defined in the following format:

```ts
export interface ExtendedColor {
    id: string
    name: string
    hex: string
    r: number
    g: number
    b: number
}
```

### randomId

You can also use the `randomId` function as it is exported

```ts
import {randomId} from "@pixium-digital/random-namer"

const ID = randomId()
// 3945
```



## Author

Burlet Mederic <mederic.burlet@pixiumdigital.com>
https://github.com/pixiumdigital
https://pixiumdigital.com