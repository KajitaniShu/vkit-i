import MetaProps from '@/types/interfaces/Meta'

declare module '*/meta.json' {
    const value: MetaProps
    export = value
}