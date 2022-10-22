import React, {useState} from 'react';
import s from './priority-table.module.css';

type RowId = string;
interface Row {
    label: string;
    id: RowId;
}
type PriorityId = string;
interface Priority {
    id: PriorityId;
    name: string;
}
type RpId = string;
interface Row_Priority {
    id: RpId;
    rowId: RowId;
    priorityId: PriorityId;
    rank: number;
}
const initialPriorities: Priority[] = [
    {id: 'p1', name: 'Impact'},
    {id: 'p2', name: 'Difficulty'}
]

const initialRows: Row[] = [
    {id: 'r1', label: 'Big bug'},
    {id: 'r2', label: 'Small bug'},
]
const initial_rows_priorities: Row_Priority[] = [
    {id: 'rp1', priorityId: 'p1', rowId: 'r1', rank: 0},
    {id: 'rp2', priorityId: 'p1', rowId: 'r2', rank: 1},
    {id: 'rp3', priorityId: 'p2', rowId: 'r1', rank: 1},
    {id: 'rp4', priorityId: 'p2', rowId: 'r2', rank: 0},
]



function PriorityTable() {
    const [priorities, setPriorities] = useState<Priority[]>(initialPriorities);
    const [rows, setRows] = useState<Row[]>(initialRows);
    const [rows_priorities, setRows_priorities] = useState<Row_Priority[]>(initial_rows_priorities);
    const [currentPriorityId, setCurrentPriorityId] = useState<PriorityId>('p1');

    const priorityThs = priorities.map(p => <th key={p.id} className={p.id === currentPriorityId ? s.currentPriorityTh : ''}>
        {p.name}
        <button type="button" className={s.selectPriorityButton} onClick={() => setCurrentPriorityId(p.id)}>*</button>
    </th>);

    const sortedRows = rows_priorities.filter(rp => rp.priorityId === currentPriorityId)
        .sort((rp1, rp2) => rp1.rank - rp2.rank)
        .map(rp => {
            const row = rows.find(r => r.id === rp.rowId)
            if (row) return row;
            else throw Error('Cannot find row ' + rp.rowId + ', rpId '+rp.id )
        });

    const updateOrder = function(rowId: RowId, delta: "Up" | "Down") {
        const rp = rows_priorities.find(rp => rp.rowId === rowId && rp.priorityId === currentPriorityId);
        if (!rp) throw Error(`Can't find row_prirority rowId=${rowId} priorityId=${currentPriorityId}`)
        // move rp +1 higher, means we find rpNext with rank rp-1 and switch their ranks
        const findRpByRank = (rank: number) => {
            const rp = rows_priorities.find(rpNext => rpNext.rank === rank && rpNext.priorityId === currentPriorityId)
            if (rp) return rp
            else throw Error(`Can't find row_prirority with rank ${rank} and priorityId=${currentPriorityId}`)
        } 
        const rpNext = delta === "Up"
            ? findRpByRank(rp.rank - 1)
            : findRpByRank(rp.rank + 1);

        const temp = rpNext.rank;
        rpNext.rank = rp.rank;
        rp.rank = temp;
        setRows_priorities([...rows_priorities]) // mutation
        console.log('udpateOrder', rp)
    }
    const updateOrderClick = function (index: number, rowId: RowId, delta: "Up" | "Down") {
        if (index === 0 && delta === "Up") {}
        else if (index === rows.length-1 && delta === "Down") {}
        else {
            updateOrder(rowId, delta);
        }
    }
    const addRow = (newLabel: string) => {
        const newRowId = 'r'+Date.now();
        const newRow: Row = {id: newRowId, label: newLabel};

        const newRPs: Row_Priority[] = priorities.map(p => {
            const lastRank = rows.length;
            return {id: 'rp'+newRowId+p.id, rowId: newRowId, priorityId: p.id, rank: lastRank}
        });
        setRows(rows.concat(newRow));
        setRows_priorities(rows_priorities.concat(newRPs))
    }
    const addPriority = (name: string) => {
        const newPriorityId = 'p' + Date.now();
        const newPriority: Priority = {
            id: newPriorityId, name
        }
        const newRPs: Row_Priority[] = rows.map((r, i) => {
            const lastRank = rows.length;
            return {id: 'rp'+r.id+newPriorityId, rowId: r.id, priorityId: newPriorityId, rank: i}
        });
        setPriorities(priorities.concat(newPriority));
        setRows_priorities(rows_priorities.concat(newRPs));
    }
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRowLabel = e.target.value;
        e.target.value = '';
        addRow(newRowLabel);
    }
    const addRowClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // document
    }
    const newColumnInputChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const newColumn = e.target.value;
        e.target.value = '';
        addPriority(newColumn);
    }
    return <table>
        <thead>
            <tr>
                <th key="draghandle">X</th>
                <th key="N">N</th>
                <th key="label">Label</th>
                {priorityThs}
                <th><input type="text" onBlur={newColumnInputChange}/></th>
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
                const rps = rows_priorities.filter(rp => rp.rowId === row.id);
                const ranks = priorities.map(p => {
                    const rank = rps.find(pp => pp.priorityId === p.id)
                    if (rank) return rank;
                    else throw Error(`Cant find an row_priority for rowId=${row.id} and priorityId=${p.id} `)
                })
                const ranksTds = ranks.map(rp => <td key={rp.id}>{rp.rank}</td>);
                return <tr key={row.id}>
                    {X}
                    {N}
                    {label}
                    {ranksTds}
                </tr>
            })}
        <tr key="input-tr">
            <td colSpan={3}>
            <input type="text" onBlur={e => inputChange(e as any)}/>
            <button type="button" onClick={e => addRowClick(e)}>+</button>
            </td>
        </tr>
        </tbody>

    </table>

}

export default PriorityTable;