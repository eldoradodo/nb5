import React from 'react';

const FIRST_HALF = [1, 2, 3, 4, 5, 6];
const SECOND_HALF = [7, 8, 9, 10, 11, 12];

export default function MonthNavigation({ month, setMonth }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <div style={{
        backgroundColor: '#a8aaf8',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {FIRST_HALF.map((element) => (
            <button
              key={element}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                backgroundColor: element === month ? '#6543ff' : '#FFFFFF',
                color: element === month ? '#FFFFFF' : '#000000',
                border: element === month ? 'none' : '1px solid #D1D5DB',
                cursor: 'pointer'
              }}
              onClick={() => setMonth(element)}
            >
              {`${element}월`}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {SECOND_HALF.map((element) => (
            <button
              key={element}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                backgroundColor: element === month ? '#6543ff' : '#FFFFFF',
                color: element === month ? '#FFFFFF' : '#000000',
                border: element === month ? 'none' : '1px solid #D1D5DB',
                cursor: 'pointer'
              }}
              onClick={() => setMonth(element)}
            >
              {`${element}월`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
