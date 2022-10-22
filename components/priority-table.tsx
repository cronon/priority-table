import {useState} from 'react';
import styles from './priority-table.module.css';

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
interface Priority_Row {
    rowId: RowId;
    priorityId: PriorityId;
    rank: number;
}
const priorities: Priority[] = [
    {id: 'p1', name: 'Impact'},
    {id: 'p2', name: 'Difficulty'}
]

const rows: Row[] = [
    {id: 'r1', label: 'Big bug'},
    {id: 'r2', label: 'Small bug'},
]
const rows_priorities: Priority_Row[] = [
    {priorityId: 'p1', rowId: 'r1', rank: 0},
    {priorityId: 'p1', rowId: 'r2', rank: 1},
    {priorityId: 'p2', rowId: 'r1', rank: 1},
    {priorityId: 'p2', rowId: 'r2', rank: 0},
]

const currentPriorityId: PriorityId = 'p1';

function PriorityTable() {
    const columns = ['X', 'N', 'Label'].concat(priorities.map(p => p.name));
    const currentPriorityName = priorities.find(p => currentPriorityId === p.id);

    return <table>
        <thead>
            {columns.map(c => (
                <th>{c}</th>
            ))}
        </thead>
        <tbody>
            {rows.map((row, i) => {
                const X = <td className={styles.dragHandle}>
                    <button type="button" className={styles.buttonUp}>+</button>
                    <button type="button" className={styles.buttonDown}>-</button>
                </td>
                const N = <td>{i+1}</td>;
                const label = <td>{row.label}</td>
                const prioritiesIds = rows_priorities.filter(rp => rp.rowId === row.id);
                const ranks = priorities.map(p => prioritiesIds.find(pp => pp.priorityId === p.id)?.rank)
                const ranksTds = ranks.map(r => <td>{r}</td>);
                return <tr>
                    {X}
                    {N}
                    {label}
                    {ranksTds}
                </tr>
            })}
           <tr>
            </tr>
        </tbody>
        
    </table>

}

export default PriorityTable;