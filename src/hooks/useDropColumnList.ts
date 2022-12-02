import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import { useUpdateOrderColumnMutation } from 'redux/api/columnApiSlice';

import { ColumnData } from 'ts/interfaces';

const useDropColumnList = (
  columnList: ColumnData[],
  type: string,
  setColumnList: React.Dispatch<React.SetStateAction<ColumnData[]>>
) => {
  const [updateOrder] = useUpdateOrderColumnMutation();

  const moveColumns = useCallback((dragIndex: number, hoverIndex: number) => {
    setColumnList((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
    );
  }, []);

  const [, drop] = useDrop({
    accept: type,
    drop() {
      updateOrder(
        columnList.map(({ _id }, index) => ({
          _id,
          order: index,
        }))
      );
    },
  });

  return {
    drop,
    moveColumns,
  };
};

export default useDropColumnList;
