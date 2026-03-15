import { useState, useEffect } from 'react';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const COLS = 10;

const SeatMap = ({ onSeatsChange, bookedSeats = [] }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    onSeatsChange?.(selected);
  }, [selected]);

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    setSelected((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const getSeatStatus = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selected.includes(seatId)) return 'selected';
    return 'available';
  };

  const seatStyles = {
    available: 'bg-dark-600 border-white/20 hover:bg-primary/30 hover:border-primary/60 cursor-pointer text-white/30',
    selected: 'bg-primary border-primary cursor-pointer text-white shadow-lg shadow-primary/30',
    booked: 'bg-white/5 border-white/5 cursor-not-allowed text-white/10',
  };

  return (
    <div className="w-full">
      {/* Screen */}
      <div className="relative mb-10">
        <div className="h-2 rounded-full bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-sm" />
        <div className="mt-1 text-center text-xs text-white/40 uppercase tracking-widest">— Screen —</div>
      </div>

      {/* Seats */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-max mx-auto space-y-2 px-2">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-1.5">
              <span className="w-5 text-xs text-white/30 font-mono text-right">{row}</span>
              <div className="flex gap-1.5">
                {Array.from({ length: COLS }, (_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const status = getSeatStatus(seatId);
                  return (
                    <button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      title={seatId}
                      className={`w-8 h-8 rounded-lg border text-[10px] font-bold transition-all duration-150 ${seatStyles[status]}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <span className="w-5 text-xs text-white/30 font-mono">{row}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-8 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-dark-600 border border-white/20" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary border border-primary" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white/5 border border-white/5" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
