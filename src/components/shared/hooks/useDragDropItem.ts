import {useDropItem} from "./useDropItem";
import {useDragItem} from "./useDragItem";

export const useDragDropItem = (
    drop_types: string[],
    id: string,
    index: number,
    drag_type: string,
    onDrop: (fromIndex: number, toIndex: number)=>void
) => {
    const [ref, handlerId, drop] = useDropItem(drop_types, index, onDrop)
    const [isDragging, drag] = useDragItem(id, index, drag_type)

    // @ts-ignore
    drag(drop(ref))

    return [ref, handlerId, isDragging, drag, drop]
};