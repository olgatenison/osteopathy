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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Список слотов</h2>
        <p className="text-sm text-gray-500">
          Здесь отображаются все временные слоты по дате. Только свободные слоты
          можно редактировать или удалять.
        </p>
      </div>

      {sortedDates.length === 0 ? (
        <p className="text-sm text-gray-500">Нет доступных слотов</p>
      ) : (
        <div className="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-sm">
          {sortedDates.map((date) => (
            <div key={date} className="overflow-hidden">
              <button
                onClick={() => toggleDate(date)}
                className="flex w-full items-center justify-between bg-gray-100 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-200"
              >
                <span>{format(new Date(date), "dd.MM.yyyy")}</span>
                {expandedDates[date] ? (
                  <ChevronDownIcon className="h-5 w-5" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5" />
                )}
              </button>

              {expandedDates[date] && (
                <ul className="divide-y divide-gray-100">
                  {slots[date].map((slot, index) => (
                    <li
                      key={slot.id || index}
                      className="flex items-center justify-between px-4 py-3 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">
                          {slot.start}–{slot.end}
                        </span>
                        <span
                          className={classNames(
                            "rounded-full px-2 py-0.5 text-xs font-semibold",
                            slot.booked
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          )}
                        >
                          {slot.booked ? "Занят" : "Свободен"}
                        </span>
                      </div>

                      {!slot.booked && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => onEditSlot({ date, index, slot })}
                            className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => onSlotDelete(date, index)}
                            className="text-red-600 hover:text-red-800 hover:underline text-sm"
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
