import {useDrop} from "react-dnd";
import type { Identifier } from 'dnd-core'
import {useRef} from "react";

interface DragItem {
  id: string
}

export const useDropItem = (
    drag_types: string[],
    onDrop: (id: string)=>void
) => {
    const ref = useRef<HTMLElement>(null)

    const [{handlerId}, drop] = useDrop<DragItem, void, { handlerId: Identifier | null; }>({
        accept: drag_types,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        drop(item: DragItem, monitor) {
            onDrop(item.id)
        },
    });

    drop(ref)

    return [ref, drop, handlerId]
};
