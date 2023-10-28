export type TOrdersBody = void

export type TOrdersDto = {
    success: boolean
    orders:{
        name: string
        ingredients: string[]
        _id: string
        status: 'done' | 'created' | 'pending' | 'cancelled'
        number: number
        createdAt: Date
        updatedAt: Date
    }[]
    total: number
    totalToday: number
}