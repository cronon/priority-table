import React, {useRef, useState} from 'react';
import s from './priority-table.module.css';
import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
  import {useSortable} from '@dnd-kit/sortable';

import {useTable, PriorityId, RowId} from './useTable';

function PriorityTable() {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const {rows, priorities, addPriority, addRow, updateOrder} = useTable();

    // const [rows_priorities, setRows_priorities] = useState<Row_Priority[]>(initial_rows_priorities);
    const [currentPriorityId, setCurrentPriorityId] = useState<PriorityId>(priorities[0].id);
    const currentPriority = priorities.find(p => p.id === currentPriorityId);
    if (!currentPriority) throw new Error(`Cant find current priority id=${currentPriorityId}`);

    const sortedRows =  currentPriority.rowIds
        .map(rowId => {
            const row = rows.find(r => r.id === rowId)
            if (row) return row;
            else throw Error('Cannot find row ' + rowId)
        });
    

    const updateOrderClick = function (index: number, rowId: RowId, delta: "Up" | "Down") {
        if (index === 0 && delta === "Up") {}
        else if (index === rows.length-1 && delta === "Down") {}
        else {
            updateOrder(rowId, currentPriorityId, delta);
        }
    }

    const newRowInputRef = useRef<HTMLInputElement>(null)
    const addRowClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const input = newRowInputRef.current;
        if (input) {
            const newRowLabel = input.value;
            input.value = '';
            addRow(newRowLabel);
        }
    }
    const newColumnInputChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const newColumn = e.target.value;
        e.target.value = '';
        addPriority(newColumn);
    }
    const newRowPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.clipboardData.items[0].getAsString(paste => {
            paste.split('\n').forEach(line => {
                addRow(line);
            });
            (e.target as HTMLInputElement).value = '';
        });
    }
    const priorityThs = priorities.map(p => <th key={p.id} className={p.id === currentPriorityId ? s.currentPriorityTh : ''}>
        <button type="button" className={s.selectPriorityButton} onClick={() => setCurrentPriorityId(p.id)}>{p.name}</button>
    </th>);



    return <table className={s.table}>
        <thead>
            <tr>
                <th key="draghandle">Ж</th>
                <th key="N">№</th>
                <th key="label">Label</th>
                {priorityThs}
                <th><input type="text" onBlur={newColumnInputChange} placeholder="New column"/></th>
            </tr>
        </thead>
        <tbody>
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => console.log('onDragEnd', event)}
                >
                <SortableContext 
                    items={sortedRows}
                    strategy={verticalListSortingStrategy}
                >
            {sortedRows.map((row, i) => {
                const X = <td key="draghandle" className={s.dragHandle}>
                    <button type="button" className={s.buttonUp} onClick={() => updateOrderClick(i, row.id, "Up")}>+</button>
                    <button type="button" className={s.buttonDown} onClick={() => updateOrderClick(i, row.id, "Down")}>-</button>
                </td>
                const N = <td key="N">{i+1}</td>;
                const label = <td key="label">{row.label}</td>

                const ranksTds = priorities.map(p => {
                    const rank = p.rowIds.findIndex(id => id === row.id);
                    if (rank !== -1) return <td key={p.id}>{rank}</td>;
                    else throw Error(`Cant find a rowId=${row.id} within priority.rowIds priorityId=${p.id} `)
                })
                return <tr key={row.id}>
                    {X}
                    {N}
                    {label}
                    {ranksTds}
                </tr>
            })}
                    </SortableContext>
            </DndContext>
        <tr key="input-tr">
            <td colSpan={3}>
            <input type="text" placeholder="New row" ref={newRowInputRef} onPaste={e => newRowPaste(e)}/>
            <button type="button" onClick={e => addRowClick(e)}>+</button>
            </td>
        </tr>
        </tbody>

    </table>

}

export default PriorityTable;