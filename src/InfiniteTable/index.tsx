import React, { useState } from 'react'
import DataGrid, { Column } from 'react-data-grid'
import { createRows, isAtBottom, loadMoreRows, Row, rowKeyGetter } from './helper';
import styles from './index.module.css'

const columns: readonly Column<Row>[] = [
  {
    key: 'id',
    name: 'ID'
  },
  {
    key: 'title',
    name: 'Title'
  },
  {
    key: 'firstName',
    name: 'First Name'
  },
  {
    key: 'lastName',
    name: 'Last Name'
  },
  {
    key: 'email',
    name: 'Email'
  }
];

const ROWS_TO_LOAD = 10000

export default function InfiniteTable() {
  const [rows, setRows] = useState(() => createRows(ROWS_TO_LOAD));
  const [isLoading, setIsLoading] = useState(false);

  async function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    if (isLoading || !isAtBottom(event)) return;

    setIsLoading(true);

    const newRows = await loadMoreRows(ROWS_TO_LOAD, rows.length);

    setRows([...rows, ...newRows]);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <div className={styles.loading_text}>Loading another {ROWS_TO_LOAD} rows</div>}
      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        onRowsChange={setRows}
        rowHeight={30}
        onScroll={handleScroll}
        className={styles.table_grid}
        direction='ltr'
      />
    </>
  )
}