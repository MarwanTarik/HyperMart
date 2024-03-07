import { pool } from './main.database'

async function truncateTable (table: string): Promise<void> {
  const query = `TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`
  await pool.query(query)
}

export {
  truncateTable
}
