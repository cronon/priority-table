import React, {useId, useRef, useState} from 'react';
import s from './priority-table.module.css';
import {CSS} from '@dnd-kit/utilities';
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

import {useTable, PriorityId, RowId, Row, Priority} from './useTable';
import { isSsr } from './isSsr';

function getRanks(rowId: RowId, priorities: Priority[]): {priorityId: PriorityId, rank: number}[] {
    return priorities.map(p => {
        const index = p.rowIds.findIndex(id => id === rowId);
        if (index !== -1) {
            const rank = p.rowIds.length - index;
            return {priorityId: p.id, rank};
        } else {
            throw Error(`Cant find a rowId=${rowId} within priority.rowIds priorityId=${p.id} `)
        }
    });
}

function PriorityTable() {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const dndContextId = useId();

    const {rows, priorities, addPriority, addRow, updateOrder, switchRows} = useTable();

    const [currentPriorityId, setCurrentPriorityId] = useState<PriorityId>(priorities[0].id);
    const currentPriority = priorities.find(p => p.id === currentPriorityId);
    if (!currentPriority) throw new Error(`Cant find current priority id=${currentPriorityId}`);

    const [highlightedRowId, setHighlightedRowId] = useState<RowId>(rows[0].id);

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
            setHighlightedRowId(rowId);
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
                <th key="draghandle" className={s.zhColumn}>Ж</th>
                <th key="N">№</th>
                <th key="label">Label</th>
                {priorityThs}
                <th>
                    <NewColumnInput onAddNewColumn={newColumn => addPriority(newColumn)} />
                </th>
            </tr>
        </thead>
        <tbody>
            <DndContext 
                sensors={sensors}
                // https://github.com/clauderic/dnd-kit/issues/899
                accessibility={{ container: isSsr ? undefined : document.body }}
                // https://github.com/clauderic/dnd-kit/issues/285
                id={dndContextId}
                collisionDetection={closestCenter}
                onDragStart={event => {
                    if (event.active) {
                        setHighlightedRowId(event.active.id as string);
                    }
                }}
                onDragEnd={(event) => {
                    if (event.over) switchRows(currentPriorityId, event.active.id as string, event.over.id as string)
                }}
                >
                <SortableContext 
                    items={sortedRows}
                    strategy={verticalListSortingStrategy}
                >
                {sortedRows.map((row, i) => {
                   const ranks = getRanks(row.id, priorities);
                   const isLastMoved = highlightedRowId === row.id;
                   return <RowView index={i} key={row.id} isLastMoved={isLastMoved} row={row} ranks={ranks}
                    onUpdateOrderClick={delta => updateOrderClick(i, row.id, delta)} />
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

interface RowViewProps {
    row: Row,
    index: number,
    ranks: {priorityId: PriorityId, rank: number}[],
    onUpdateOrderClick: (delta: "Up"|"Down") => void,
    isLastMoved: boolean;
}
function RowView({row, index, ranks, isLastMoved, onUpdateOrderClick}: RowViewProps): JSX.Element {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: row.id});
      
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

    const X = <td key="draghandle" className={s.dragHandle}>
            <button type="button" className={s.buttonUp} onClick={() => {console.log('button click up'); onUpdateOrderClick("Up")}}>+</button>
            <button type="button" className={s.buttonDown} onClick={() => onUpdateOrderClick("Down")}>-</button>
            <button type="button"  {...listeners}>#</button>
        </td>
    const N = <td key="N">{index+1}</td>;
    const label = <td key="label">{row.label}</td>

    const ranksTds = ranks.map(r => <td key={r.priorityId}>{r.rank}</td>);
    const trClass = isLastMoved ? s.highlightedTr  : '';
    return <tr key={row.id} className={trClass}  ref={setNodeRef} style={style} {...attributes}>
        {X}
        {N}
        {label}
        {ranksTds}
        <td key="input-column" />
    </tr>
}

function NewColumnInput({onAddNewColumn}: {onAddNewColumn: (newColumn: string) => void}): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);

    const addColumn = () => {
        if (inputRef?.current) {
            const value = inputRef.current.value;
            inputRef.current.value = '';
            onAddNewColumn(value);
        }

    }
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addColumn()
        }
    }

    return <>
        <input className={s.newColumnInput} ref={inputRef} onKeyPress={onKeyPress} type="text" placeholder="New column"/>
        <button type="button" onClick={addColumn}>+</button>
    </>
}
export default PriorityTable;