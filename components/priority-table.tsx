import React, {useRef, useState} from 'react';
import s from './priority-table.module.css';

const getId = (() => {
    let i = 0;
    return () => {i+=1; return i}
})();

type RowId = string;
interface Row {
    label: string;
    id: RowId;
}
type PriorityId = string;
interface Priority {
    id: PriorityId;
    name: string;
    rowIds: RowId[];
}

const initialRows: Row[] = [
    {id: 'r'+getId(), label: 'Big bug'},
    {id: 'r'+getId(), label: 'Small bug'},
]
const initialPriorities: Priority[] = [
    {id: 'p'+getId(), name: 'Impact', rowIds: [initialRows[0].id, initialRows[1].id]},
    {id: 'p'+getId(), name: 'Difficulty', rowIds: [initialRows[1].id, initialRows[0].id]}
]

function PriorityTable() {
    const [priorities, setPriorities] = useState<Priority[]>(initialPriorities);
    const [rows, setRows] = useState<Row[]>(initialRows);
    // const [rows_priorities, setRows_priorities] = useState<Row_Priority[]>(initial_rows_priorities);
    const [currentPriorityId, setCurrentPriorityId] = useState<PriorityId>(initialPriorities[0].id);
    const currentPriority = priorities.find(p => p.id === currentPriorityId);
    if (!currentPriority) throw new Error(`Cant find current priority id=${currentPriorityId}`);

    const sortedRows =  currentPriority.rowIds
        .map(rowId => {
            const row = rows.find(r => r.id === rowId)
            if (row) return row;
            else throw Error('Cannot find row ' + rowId)
        });
    
    const updateOrder = function(rowId: RowId, delta: "Up" | "Down") {
        const rowIndex = currentPriority.rowIds.findIndex(id => id === rowId);
        if (rowIndex === -1) throw Error(`Can't find a row rowId=${rowId}`)

        const newIndex = delta === 'Up' ? rowIndex - 1 : rowIndex + 1;
        
        currentPriority.rowIds.splice(rowIndex, 1);
        currentPriority.rowIds.splice(newIndex, 0, rowId);

        setPriorities(p => [...p]) // mutation
    }

    const updateOrderClick = function (index: number, rowId: RowId, delta: "Up" | "Down") {
        if (index === 0 && delta === "Up") {}
        else if (index === rows.length-1 && delta === "Down") {}
        else {
            updateOrder(rowId, delta);
        }
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