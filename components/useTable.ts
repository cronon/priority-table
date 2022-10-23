import {useState} from 'react';

const getId = (() => {
    let i = 0;
    return () => {i+=1; return i}
})();

// type RowId = string;
// interface Row {
//     label: string;
//     id: RowId;
// }
// type PriorityId = string;
// interface Priority {
//     id: PriorityId;
//     name: string;
// }
// type RpId = string;
// interface Row_Priority {
//     id: RpId;
//     rowId: RowId;
//     priorityId: PriorityId;
//     rank: number;
// }
// const initialPriorities: Priority[] = [
//     {id: 'p'+getId(), name: 'Impact'},
//     {id: 'p'+getId(), name: 'Difficulty'}
// ]

// const initialRows: Row[] = [
//     {id: 'r'+getId(), label: 'Big bug'},
//     {id: 'r'+getId(), label: 'Small bug'},
// ]
// const initial_rows_priorities: Row_Priority[] = [
//     {id: 'rp'+getId(), priorityId: initialPriorities[0].id, rowId: initialRows[0].id, rank: 0},
//     {id: 'rp'+getId(), priorityId: initialPriorities[1].id, rowId: initialRows[0].id, rank: 1},
//     {id: 'rp'+getId(), priorityId: initialPriorities[0].id, rowId: initialRows[1].id, rank: 1},
//     {id: 'rp'+getId(), priorityId: initialPriorities[1].id, rowId: initialRows[1].id, rank: 0},
// ]

// interface TableModel {
//     rows: Row[]
//     addRows: ()
// }
// export function useTable(){

// }