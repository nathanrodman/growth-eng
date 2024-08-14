import React from "react";
import { css } from "@emotion/css";

export type TableRow = {
  timestamp: number;
  street: string;
  city: string;
  executionTime: number;
};

type TableProps = {
  rows: TableRow[];
};

const getStyles = () => ({
  table: css`
    border-collapse: collapse;
    margin: 10px;

    &,
    th,
    td {
      border: 1px solid black;
      padding: 0.5rem;
    }
  `,
});

export const Table = (props: TableProps) => {
  const { rows } = props;
  const styles = getStyles();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Street</th>
          <th>City</th>
          <th>Execution Time (ms)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.timestamp}>
            <td>{row.timestamp}</td>
            <td>{row.street}</td>
            <td>{row.city}</td>
            <td>{row.executionTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
