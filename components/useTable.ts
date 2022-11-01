import {useState} from 'react';

const getId = (() => {
    let i = 0;
    return () => {i+=1; return i}
})();

export type RowId = string;
export interface Row {
    label: string;
    id: RowId;
}
export type PriorityId = string;
export interface Priority {
    id: PriorityId;
    name: string;
    rowIds: RowId[];
}

const initialRows: Row[] = [
    {id: 'r'+getId(), label: 'Big bug'},
    {id: 'r'+getId(), label: 'Medium bug'},
    {id: 'r'+getId(), label: 'Small bug'},
]
const initialPriorities: Priority[] = [
    {id: 'p'+getId(), name: 'Impact', rowIds: [initialRows[0].id, initialRows[1].id, initialRows[2].id]},
    {id: 'p'+getId(), name: 'Difficulty', rowIds: [initialRows[2].id, initialRows[1].id, initialRows[0].id]}
]

export interface UseTableHook {
    addRow: (newLabel: string) => void;
    addPriority: (newLabel: string) => void;
    updateOrder: (rowId: RowId, priorityId: PriorityId, delta: "Up" | "Down") => void;
    rows: Row[],
    priorities: Priority[];
}
export function useTable(): UseTableHook {
    const [priorities, setPriorities] = useState<Priority[]>(initialPriorities);
    const [rows, setRows] = useState<Row[]>(initialRows);
    
    const updateOrder = function(rowId: RowId, priorityId: PriorityId, delta: "Up" | "Down") {
        const priority = priorities.find(p => p.id === priorityId);
        if (!priority) throw new Error(`Can't find a priority with id=${priorityId}`);

        const rowIndex = priority.rowIds.findIndex(id => id === rowId);
        if (rowIndex === -1) throw Error(`Can't find a row rowId=${rowId}`)

        const newIndex = delta === 'Up' ? rowIndex - 1 : rowIndex + 1;
        
        priority.rowIds.splice(rowIndex, 1);
        priority.rowIds.splice(newIndex, 0, rowId);

        setPriorities(p => [...p]) // mutation
    }

    const addRow = (newLabel: string) => {
        const newRowId = 'r'+getId();
        const newRow: Row = {id: newRowId, label: newLabel};

        setRows(rows => rows.concat(newRow));
        setPriorities(priorities => priorities.map(p => ({
            ...p,
            rowIds: p.rowIds.concat(newRowId)
        })))
    }
    const addPriority = (name: string) => {
        const newPriorityId = 'p' + getId();
        const newPriority: Priority = {
            id: newPriorityId, name,
            rowIds: rows.map(r => r.id)
        }
        setPriorities(priorities => priorities.concat(newPriority));
    }


    return {rows, priorities, addPriority, addRow, updateOrder};
}