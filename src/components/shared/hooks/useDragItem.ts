import {useDrag} from "react-dnd";

export const useDragItem = (id: string, index: number, drag_type: string) =>{

    const [{isDragging}, drag] = useDrag({
        type: drag_type,
        item: () => {
            return {id, index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return [isDragging, drag]
}