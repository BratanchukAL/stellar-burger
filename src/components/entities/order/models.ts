type TIngredientsIDs = string

interface IOrder{
    name: string
    ingredients: TIngredientsIDs[]
    _id: string
    status: 'done' | 'created' | 'pending' | 'cancelled'
    number: number
    createdAt: Date
    updatedAt: Date
}


export interface IOrders{
    orders: IOrder[]
    total: number
    totalToday: number
}