import {TStatus} from "./models";

export const StatusDictionary: Record<TStatus, string> = {
    done: 'Готово',
    created: 'Создан',
    pending: 'Готовится',
    cancelled: 'Отменен'
}