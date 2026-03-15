import { useState } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';

const ShowTimePicker = ({ shows, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(shows?.[0]?.date || '');
  const [selectedTime, setSelectedTime] = useState('');

  const selectedShow = shows?.find((s) => s.date === selectedDate);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const day = date.toLocaleDateString('en-IN', { weekday: 'short' });
    const d = date.getDate();
    const month = date.toLocaleDateString('en-IN', { month: 'short' });
    return { day, d, month };
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onSelect?.({ date: selectedDate, time, price: selectedShow?.price || 0 });
  };

  return (
    <div className="space-y-4">
      {/* Date selector */}
      <div>
        <p className="text-sm text-white/50 mb-2 flex items-center gap-1.5">
          <FiCalendar size={13} />
          Select Date
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {shows?.map((show) => {
            const { day, d, month } = formatDate(show.date);
            const isSelected = selectedDate === show.date;
            return (
              <button
                key={show.date}
                onClick={() => {
                  setSelectedDate(show.date);
                  setSelectedTime('');
                  onSelect?.(null);
                }}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                    : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white bg-white/5'
                }`}
              >
                <span className="text-xs font-medium">{day}</span>
                <span className="text-xl font-bold">{d}</span>
                <span className="text-xs">{month}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time selector */}
      {selectedDate && (
        <div>
          <p className="text-sm text-white/50 mb-2 flex items-center gap-1.5">
            <FiClock size={13} />
            Select Showtime · <span className="text-accent">₹{selectedShow?.price}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedShow?.times?.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                      : 'border-white/15 text-white/70 hover:border-primary/50 hover:text-white bg-white/5'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTimePicker;
