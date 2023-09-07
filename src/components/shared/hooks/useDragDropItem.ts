import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {Identifier, XYCoord} from "dnd-core";


interface DragItem {
  index: number
  id: string
}

export const useDragDropItem = (
    drop_types: string[],
    id: string,
    index: number,
    drag_type: string,
    onHover: (fromIndex: number, toIndex: number)=>void
) => {
    // const dragRef = useRef<HTMLElement>(null)
    // const dropRef = useRef<HTMLElement>(null)
    const dropRef = useRef<HTMLElement>(null)

    const [{handlerId}, drop] = useDrop<DragItem, void, { handlerId: Identifier | null; }>({
        accept: drop_types,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!dropRef.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = dropRef.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            onHover(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    });

    const [{isDragging}, drag] = useDrag({
        type: drag_type,
        item: () => {
            return {id, index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(dropRef)
    drop(dropRef)

    return [dropRef, isDragging]
};