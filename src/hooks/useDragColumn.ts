import { useRef } from 'react';
import { useDrop, XYCoord, useDrag, DragSourceMonitor } from 'react-dnd';

import { ColumnData } from 'ts/interfaces';

interface DragItem {
  column: ColumnData;
  index: number;
  type: string;
}

const useDragColumn = (
  column: ColumnData,
  index: number,
  type: string,
  move: (dragIndex: number, hoverIndex: number) => void
) => {
  const dragRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: type,

    hover(item: DragItem, monitor) {
      if (!dragRef.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dragRef.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX <= hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX >= hoverMiddleX) {
        return;
      }

      move(dragIndex, hoverIndex);

      const currentItem = item;
      currentItem.index = hoverIndex;
    },
  });

  const [{ isDragging, handlerId }, drag] = useDrag({
    type,
    item: {
      column,
      index,
      type,
    },

    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  });

  drag(drop(dragRef));

  return {
    dragRef,
    isDragging,
    handlerId,
  };
};

export default useDragColumn;
