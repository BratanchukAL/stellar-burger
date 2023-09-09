import {useDrag} from "react-dnd";

export const useDragItem = (id: string, drag_type: string) =>{

    const [{isDragging}, drag] = useDrag({
        type: drag_type,
        item: () => {
            return {id}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return [drag, isDragging]
}