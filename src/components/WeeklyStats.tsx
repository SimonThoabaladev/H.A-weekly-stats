import React, { useMemo, useState } from 'react';
import './WeeklyStats.css';

interface WeeklyStatRow {
  id: number;
  ed: string;
  gender: 'Female' | 'Male' | 'Other';
  bc2025: number;
  bc2026: number;
  late: number;
}

const WeeklyStats: React.FC = () => {
  const [rows, setRows] = useState<WeeklyStatRow[]>([]);
  const [newRow, setNewRow] = useState<Omit<WeeklyStatRow, 'id'>>({
    ed: '',
    gender: 'Female',
    bc2025: 0,
    bc2026: 0,
    late: 0,
  });

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.bc2025 += row.bc2025;
        acc.bc2026 += row.bc2026;
        acc.late += row.late;
        acc.total += row.bc2025 + row.bc2026 + row.late;
        return acc;
      },
      { bc2025: 0, bc2026: 0, late: 0, total: 0 }
    );
  }, [rows]);

  const handleAddRow = () => {
    if (!newRow.ed.trim()) {
      return;
    }

    setRows([
      ...rows,
      {
        id: rows.length + 1,
        ed: newRow.ed.trim(),
        gender: newRow.gender,
        bc2025: newRow.bc2025,
        bc2026: newRow.bc2026,
        late: newRow.late,
      },
    ]);

    setNewRow({ ed: '', gender: 'Female', bc2025: 0, bc2026: 0, late: 0 });
  };

  const handleRemove = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="weekly-stats-page">
      <div className="weekly-stats-header">
        <div>
          <h1 style={{
            fontSize: '26px',
            margin: '0 0 8px 0',
            color: '#1f3a5d'
          }}>
            Kubake Council Weekly Statistics
          </h1>
          <p style={{
            margin: 0,
            color: '#627489',
            fontSize: '14px'
          }}>
            03 - 06 April 2026
          </p>
        </div>
        <div className="weekly-stats-summary">
          <div style={{ fontSize: '12px', color: '#7a8aa6', marginBottom: '10px', fontWeight: 600 }}>
            Summary Totals
          </div>
          <div style={{ display: 'grid', gap: '8px' }}>
            <div style={{ color: '#1f3a5d', fontSize: '16px', fontWeight: 600 }}>BC 2025: {totals.bc2025}</div>
            <div style={{ color: '#1f3a5d', fontSize: '16px', fontWeight: 600 }}>BC 2026: {totals.bc2026}</div>
            <div style={{ color: '#1f3a5d', fontSize: '16px', fontWeight: 600 }}>Late: {totals.late}</div>
            <div style={{ color: '#27ae60', fontSize: '18px', fontWeight: 700 }}>Total: {totals.total}</div>
          </div>
        </div>
      </div>

      <div className="weekly-stats-sections">
        <section className="weekly-stats-card">
          <div className="weekly-stats-card-header">
            <div>
              <h2 style={{
                margin: 0,
                color: '#1f3a5d',
                fontSize: '20px'
              }}>
                Add New Entry
              </h2>
              <p style={{ margin: '8px 0 0 0', color: '#7a8aa6', fontSize: '14px' }}>
                Capture ED, gender, B.C counts and late attendance for the week.
              </p>
            </div>
            <button
              onClick={handleAddRow}
              style={{
                backgroundColor: '#255bff',
                color: 'white',
                border: 'none',
                borderRadius: '999px',
                padding: '12px 24px',
                cursor: 'pointer',
                fontWeight: 600,
                letterSpacing: '0.01em'
              }}
            >
              Add Entry
            </button>
          </div>

          <div className="weekly-stats-form-grid">
            <label style={{ display: 'grid', gap: '8px', fontSize: '14px', color: '#354155' }}>
              ED
              <input
                type="text"
                value={newRow.ed}
                onChange={(e) => setNewRow({ ...newRow, ed: e.target.value })}
                placeholder="Name of ED"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #d7dde7',
                  background: '#fbfdff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </label>

            <label style={{ display: 'grid', gap: '8px', fontSize: '14px', color: '#354155' }}>
              Gender
              <select
                value={newRow.gender}
                onChange={(e) => setNewRow({ ...newRow, gender: e.target.value as WeeklyStatRow['gender'] })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #d7dde7',
                  background: '#fbfdff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label style={{ display: 'grid', gap: '8px', fontSize: '14px', color: '#354155' }}>
              Current B.C 2025
              <input
                type="number"
                min="0"
                value={newRow.bc2025}
                onChange={(e) => setNewRow({ ...newRow, bc2025: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #d7dde7',
                  background: '#fbfdff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </label>

            <label style={{ display: 'grid', gap: '8px', fontSize: '14px', color: '#354155' }}>
              Current B.C 2026
              <input
                type="number"
                min="0"
                value={newRow.bc2026}
                onChange={(e) => setNewRow({ ...newRow, bc2026: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #d7dde7',
                  background: '#fbfdff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </label>

            <label style={{ display: 'grid', gap: '8px', fontSize: '14px', color: '#354155' }}>
              Late
              <input
                type="number"
                min="0"
                value={newRow.late}
                onChange={(e) => setNewRow({ ...newRow, late: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #d7dde7',
                  background: '#fbfdff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </label>
          </div>
        </section>

        <section className="weekly-stats-card">
          <div className="weekly-stats-card-header">
            <div>
              <h2 style={{
                margin: 0,
                color: '#1f3a5d',
                fontSize: '20px'
              }}>
                Weekly Attendance Table
              </h2>
              <p style={{ margin: '8px 0 0 0', color: '#7a8aa6', fontSize: '14px' }}>
                Entered rows are shown here with totals calculated automatically.
              </p>
            </div>
            <span style={{
              color: '#5f7daf',
              fontSize: '14px',
              fontWeight: 600
            }}>
              {rows.length} rows added
            </span>
          </div>

          <div className="weekly-stats-table-wrapper">
            <table className="weekly-stats-table">
              <thead>
                <tr style={{ backgroundColor: '#eef4ff' }}>
                  {['ED', 'Gender', 'Current B.C 2025', 'Current B.C 2026', 'Late', 'Total', ''].map((heading) => (
                    <th key={heading} style={{
                      padding: '16px 14px',
                      textAlign: 'left',
                      color: '#52607a',
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid #dce3ee'
                    }}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8fbff'
                  }}>
                    <td style={{ padding: '14px', color: '#1f3a5d', fontWeight: 600 }}>{row.ed}</td>
                    <td style={{ padding: '14px', color: '#52607a' }}>{row.gender}</td>
                    <td style={{ padding: '14px', color: '#1f3a5d', fontWeight: 600 }}>{row.bc2025}</td>
                    <td style={{ padding: '14px', color: '#1f3a5d', fontWeight: 600 }}>{row.bc2026}</td>
                    <td style={{ padding: '14px', color: '#e67e22', fontWeight: 600 }}>{row.late}</td>
                    <td style={{ padding: '14px', color: '#27ae60', fontWeight: 700 }}>{row.bc2025 + row.bc2026 + row.late}</td>
                    <td style={{ padding: '14px' }}>
                      <button
                        onClick={() => handleRemove(row.id)}
                        className="weekly-stats-remove-button"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ padding: '22px', textAlign: 'center', color: '#7a8aa6' }}>
                      No entries yet. Use the form above to add weekly statistics.
                    </td>
                  </tr>
                )}
              </tbody>
              {rows.length > 0 && (
                <tfoot>
                  <tr style={{ backgroundColor: '#f6f9ff' }}>
                    <td style={{ padding: '16px', fontWeight: 700, color: '#1f3a5d' }}>Total</td>
                    <td />
                    <td style={{ padding: '16px', fontWeight: 700, color: '#1f3a5d' }}>{totals.bc2025}</td>
                    <td style={{ padding: '16px', fontWeight: 700, color: '#1f3a5d' }}>{totals.bc2026}</td>
                    <td style={{ padding: '16px', fontWeight: 700, color: '#1f3a5d' }}>{totals.late}</td>
                    <td style={{ padding: '16px', fontWeight: 700, color: '#27ae60' }}>{totals.total}</td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeeklyStats;
