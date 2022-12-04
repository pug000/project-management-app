import { DropResult } from '@hello-pangea/dnd';

import { useUpdateOrderColumnMutation } from 'redux/api/columnApiSlice';
import { useUpdateOrderTaskMutation } from 'redux/api/tasksApiSlice';

import { ColumnData, TaskList } from 'ts/interfaces';

const useDragAndDrop = (
  columnList: ColumnData[],
  setColumnList: React.Dispatch<React.SetStateAction<ColumnData[]>>,
  taskList: TaskList,
  setTaskList: React.Dispatch<React.SetStateAction<TaskList>>
) => {
  const [updateOrderColumn] = useUpdateOrderColumnMutation();
  const [updateOrderTask] = useUpdateOrderTaskMutation();

  const onDragEnd = ({ destination, source, type }: DropResult) => {
    if (!destination) {
      return;
    }

    if (type === 'column') {
      if (
        destination?.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
      const columns = [...columnList];
      const [reorderedColumn] = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, reorderedColumn);

      setColumnList(columns);
      updateOrderColumn(
        columns.map(({ _id }, index) => ({
          _id,
          order: index,
        }))
      );
    }

    if (type === 'task') {
      const sourceTasks = [...taskList[source.droppableId]];
      const destinationTasks = [...taskList[destination.droppableId]];

      if (source.droppableId !== destination.droppableId) {
        const [reorderedTask] = sourceTasks.splice(source.index, 1);
        destinationTasks.splice(destination.index, 0, reorderedTask);

        setTaskList((prev) => ({
          ...prev,
          [source.droppableId]: sourceTasks,
          [destination.droppableId]: [
            ...destinationTasks.map((item) => ({
              ...item,
              columnId: destination.droppableId,
            })),
          ],
        }));

        updateOrderTask([
          ...sourceTasks.map(({ _id, columnId }, index) => ({
            _id,
            columnId,
            order: index,
          })),
          ...destinationTasks.map(({ _id }, index) => ({
            _id,
            order: index,
            columnId: destination.droppableId,
          })),
        ]);
      } else {
        const copiedSourceTasks = [...sourceTasks];
        const [reorderTask] = copiedSourceTasks.splice(source.index, 1);
        copiedSourceTasks.splice(destination.index, 0, reorderTask);

        setTaskList((prev) => ({
          ...prev,
          [source.droppableId]: copiedSourceTasks,
        }));

        updateOrderTask(
          copiedSourceTasks.map(({ _id, columnId }, index) => ({
            _id,
            columnId,
            order: index,
          }))
        );
      }
    }
  };

  return {
    onDragEnd,
  };
};

export default useDragAndDrop;
