export type TOrdersBody = void

export type TOrdersDto = {
    success: boolean
    orders:{
        name: string
        ingredients: string[]
        _id: string
        status: 'done' | 'created' | 'pending' | 'cancelled'
        number: number
        createdAt: string
        updatedAt: string
    }[]
    total: number
    totalToday: number
}