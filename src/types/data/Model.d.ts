import Model from '@/types/interfaces/Model'

declare module '*/model.json' {
    const value: ModelProps
    export = value
}