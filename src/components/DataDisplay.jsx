"use client";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
  format,
  addDays,
} from "date-fns";
import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ru } from "date-fns/locale";

import { capitalizeDate } from "@/utils/capitalizeDate";
import { getWeekdayLetters } from "@/utils/getWeekdayLetters";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DataDisplay({ onSlotChange, onDateChange }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [daySlots, setDaySlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const weekdayLetters = getWeekdayLetters();
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [datesWithSlots, setDatesWithSlots] = useState(new Set());

  const days = [];
  let day = start;
  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handlePrev = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNext = () => setCurrentMonth(addMonths(currentMonth, 1));

  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlotsForDate = async () => {
      setLoading(true);
      const formattedDate = format(selectedDate, "yyyy-MM-dd", { locale: ru });

      const { data, error } = await supabase
        .from("slots")
        .select("*")
        .eq("date", formattedDate)
        .eq("booked", false)
        .order("start", { ascending: true });

      if (error) {
        console.error("Ошибка при загрузке слотов:", error);
        setDaySlots([]);
      } else {
        setDaySlots(data);
      }
      setLoading(false);
    };

    fetchSlotsForDate();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedSlot) {
      onSlotChange?.(selectedSlot);
    }
  }, [selectedSlot]);

  useEffect(() => {
    if (selectedDate) {
      onDateChange?.(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    // границы сетки календаря для текущего месяца
    const gridStart = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 1,
    });
    const gridEnd = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

    const fetchMonthSlots = async () => {
      const from = format(gridStart, "yyyy-MM-dd");
      const to = format(gridEnd, "yyyy-MM-dd");

      const { data, error } = await supabase
        .from("slots")
        .select("date")
        .gte("date", from)
        .lte("date", to)
        .eq("booked", false);

      if (error) {
        console.error("Ошибка загрузки дат со слотами:", error);
        setDatesWithSlots(new Set());
        return;
      }

      // дата из БД формата YYYY-MM-DD
      setDatesWithSlots(new Set(data.map((r) => r.date)));
    };

    fetchMonthSlots();
  }, [currentMonth]);

  return (
    <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 mb-8">
      {/* Calendar */}
      <div className="pr-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 ">
            {capitalizeDate(currentMonth, "LLLL yyyy")}
          </h2>
          <div className="flex gap-2">
            <button type="button" onClick={handlePrev}>
              <ChevronLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
            <button type="button" onClick={handleNext}>
              <ChevronRightIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 text-center text-xs text-gray-500">
          {weekdayLetters.map((day, idx) => (
            <div key={idx}>{day}</div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((dayItem, idx) => {
            const dayStr = format(dayItem, "yyyy-MM-dd");
            const hasSlots =
              isSameMonth(dayItem, currentMonth) && datesWithSlots.has(dayStr);

            const isSelected =
              selectedDate &&
              format(dayItem, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");

            return (
              <div
                key={dayItem.toString()}
                className={classNames(
                  idx >= 7 && "border-t border-gray-200",
                  "py-2"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDate(dayItem)}
                  className={classNames(
                    // выбранный день
                    isSelected &&
                      "bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2 ring-offset-white",
                    // сегодняшний (когда не выбран)
                    !isSelected &&
                      isToday(dayItem) &&
                      "font-bold ring-2 ring-[#d6d8d5]  ",
                    // дни текущего месяца с доступными слотами — мягкая заливка
                    !isSelected &&
                      !isToday(dayItem) &&
                      hasSlots &&
                      "bg-[#d6d8d5]",
                    // цвета текста по умолчанию
                    !isSelected &&
                      !isToday(dayItem) &&
                      isSameMonth(dayItem, currentMonth) &&
                      "text-gray-900",
                    !isSameMonth(dayItem, currentMonth) && "text-gray-400",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 transition"
                  )}
                >
                  <time dateTime={dayStr}>{format(dayItem, "d")}</time>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side – отображение слотов */}
      <div className="  pt-10 md:pt-0 md:pl-6 ">
        {selectedDate && (
          <>
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Доступное время на {capitalizeDate(selectedDate, "d MMMM yyyy")}
            </h2>

            {loading ? (
              <p className="text-sm text-gray-500">Загрузка...</p>
            ) : daySlots.length > 0 ? (
              <div className="space-y-2 text-sm text-gray-900">
                {daySlots.map((slot) => (
                  <label
                    key={slot.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot.id}
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-gray-900 checked:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      checked={selectedSlot?.id === slot.id}
                      onChange={() => setSelectedSlot(slot)}
                    />
                    <span>
                      {slot.start} – {slot.end}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Нет свободного времени на эту дату. Попробуйте выбрать другой
                день.
              </p>
            )}
          </>
        )}

        {!selectedDate && (
          <p className="block text-sm font-semibold text-gray-900">
            Выберите дату в календаре
          </p>
        )}
      </div>
    </div>
  );
}
