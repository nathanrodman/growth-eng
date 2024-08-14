import React, { useMemo, useState } from "react";
import { css } from "@emotion/css";

import { fetchLastLocation } from "./backend/fetchLastLocations";
import { Table, TableRow } from "./Table";

const getStyles = () => ({
  button: css`
    border: 1px solid black;
    background: transparent;
    padding: 5px;
  `,
  container: css`
    margin: 10px;
  `,
});

function App() {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [fastest, setFastest] = useState<number | null>(null);
  const [slowest, setSlowest] = useState<number | null>(null);
  const average = useMemo(() => {
    if (rows.length === 0) {
      return null;
    }
    const total = rows.reduce((acc, row) => acc + row.executionTime, 0);
    return total / rows.length;
  }, [rows]);

  const handleOnClick = async () => {
    const timestamp = Date.now();

    const time1 = performance.now();
    await fetchLastLocation().then((res) => {
      const time2 = performance.now();
      const elapsed = time2 - time1;

      if (fastest === null || elapsed < fastest) {
        setFastest(elapsed);
      }
      if (slowest === null || elapsed > slowest) {
        setSlowest(elapsed);
      }

      setRows([
        ...rows,
        {
          timestamp,
          street: res.address.street,
          city: res.address.city,
          executionTime: elapsed,
        },
      ]);
    });
  };

  const s = getStyles();
  return (
    <div className={s.container}>
      <button className={s.button} onClick={() => handleOnClick()}>
        Get Last Location
      </button>
      <Table rows={rows} />
      <div>
        <div>Fastest: {fastest} ms</div>
        <div>Slowest: {slowest} ms</div>
        <div>Average: {average?.toFixed(2)} ms</div>
      </div>
    </div>
  );
}

export default App;
