import {useState} from 'react';
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
interface Priority_Row {
    id: RpId;
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
    {id: 'rp1', priorityId: 'p1', rowId: 'r1', rank: 0},
    {id: 'rp2', priorityId: 'p1', rowId: 'r2', rank: 1},
    {id: 'rp3', priorityId: 'p2', rowId: 'r1', rank: 1},
    {id: 'rp4', priorityId: 'p2', rowId: 'r2', rank: 0},
]



function PriorityTable() {
    const [currentPriorityId, setCurrentPriorityId] = useState<PriorityId>('p1');

    const priorityThs = priorities.map(p => <th className={p.id === currentPriorityId ? s.currentPriorityTh : ''}>
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

    return <table>
        <thead>
            <th>X</th>
            <th>N</th>
            <th>Label</th>
            {priorityThs}
        </thead>
        <tbody>
            {sortedRows.map((row, i) => {
                const X = <td className={s.dragHandle}>
                    <button type="button" className={s.buttonUp}>+</button>
                    <button type="button" className={s.buttonDown}>-</button>
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