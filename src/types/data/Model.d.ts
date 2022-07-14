import Model from '@/types/interfaces/PlayerModel'

declare module '*/model.json' {
    const value: ModelProps
    export = value
}