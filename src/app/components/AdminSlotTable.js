"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminSlotTable({ slots, onSlotDelete, onEditSlot }) {
  const [expandedDates, setExpandedDates] = useState({});

  const toggleDate = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const sortedDates = Object.keys(slots).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Список слотов</h2>
      {sortedDates.length === 0 ? (
        <p className="text-sm text-gray-500">Нет доступных слотов</p>
      ) : (
        <div className="space-y-4">
          {sortedDates.map((date) => (
            <div key={date} className="border rounded">
              <button
                onClick={() => toggleDate(date)}
                className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-gray-200"
              >
                <span>{format(new Date(date), "dd.MM.yyyy")}</span>
                {expandedDates[date] ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>

              {expandedDates[date] && (
                <ul className="divide-y">
                  {slots[date].map((slot, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center px-4 py-2 text-sm"
                    >
                      <span>
                        {slot.start} – {slot.end} |{" "}
                        {slot.booked ? "❌ Занят" : "✅ Свободен"}
                      </span>
                      {!slot.booked && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => onEditSlot({ date, index, slot })}
                            className="text-indigo-600 hover:underline"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => onSlotDelete(date, index)}
                            className="text-red-600 hover:underline"
                          >
                            Удалить
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
