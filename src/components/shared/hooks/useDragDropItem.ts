import React, {useRef} from "react";
import {DragSourceMonitor, useDrag, useDrop} from "react-dnd";
import {XYCoord} from "dnd-core";


interface IDragItem {
    uuid: string
    index: number
    hoverIndex: number
    id: string
}

type TDragRef = React.RefObject<HTMLDivElement>
type TDropRef = React.RefObject<HTMLDivElement>
type TIsDragging = boolean

export const useDragDropItem = (
    dropTypes: string[],
    id: string,
    index: number,
    uuid: string,
    dragType: string,
    onHover: (fromUUID: string, toIndex: number)=>void
): [TDragRef, TDropRef, TIsDragging, unknown] => {
    const dragRef = useRef<HTMLDivElement>(null)
    const dropRef = useRef<HTMLDivElement>(null)

    const [_, drop] = useDrop<IDragItem, void, unknown>({
        accept: dropTypes,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: IDragItem, monitor) {
            if (!dropRef.current) {
                return
            }
            const dragIndex = item.hoverIndex
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
            onHover(item.uuid, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.hoverIndex = hoverIndex
        },
    }, [index]);

    const [{isDragging}, drag, preview] = useDrag(()=>({
        type: dragType,
        collect: (monitor: DragSourceMonitor<IDragItem, unknown>) => ({
            isDragging: monitor.isDragging(),
        }),
        item: (): IDragItem => {
            return {id, index, uuid, hoverIndex: index}
        },
        end: (item, monitor) => {
            const didDrop = monitor.didDrop()
            if (!didDrop) {
                // to Back place
                onHover(uuid, item.index)
            }
        },
    }), [id, index, uuid])

    drag(dragRef)
    drop(dropRef)
    preview(dropRef)

    return [dragRef, dropRef, isDragging, _]
};