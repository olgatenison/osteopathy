"use client";
import { useEffect, useState } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminSlots({ onSlotAdd, editingSlot }) {
  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");

  useEffect(() => {
    if (editingSlot) {
      setDate(editingSlot.date);
      const { start, end } = editingSlot.slot;
      const [sh, sm] = start.split(":");
      const [eh, em] = end.split(":");
      setStartHour(sh);
      setStartMinute(sm);
      setEndHour(eh);
      setEndMinute(em);
    }
  }, [editingSlot]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 / 5 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  const handleSubmit = () => {
    if (!date || !startHour || !startMinute || !endHour || !endMinute) return;

    // 🕒 проверка, что начало раньше конца
    const startTime = parseInt(startHour) * 60 + parseInt(startMinute);
    const endTime = parseInt(endHour) * 60 + parseInt(endMinute);

    if (startTime >= endTime) {
      alert("⛔ Время начала должно быть раньше времени окончания");
      return;
    }

    const newSlot = {
      start: `${startHour}:${startMinute}`,
      end: `${endHour}:${endMinute}`,
      booked: false,
    };

    if (typeof onSlotAdd === "function") {
      onSlotAdd(date, newSlot, editingSlot?.index ?? null);
    } else {
      console.error("onSlotAdd не передан или не является функцией");
    }

    // reset
    setDate("");
    setStartHour("");
    setStartMinute("");
    setEndHour("");
    setEndMinute("");
  };

  return (
    <div>
      <h2
        className={classNames(
          "text-xl font-bold mb-4",
          editingSlot ? "text-yellow-600" : "text-indigo-600"
        )}
      >
        {editingSlot ? "✏️ Редактировать слот" : "Добавить слот"}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Дата
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Начало
            </label>
            <div className="flex gap-2">
              <select
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-1/2 border rounded px-3 py-2"
              >
                <option value="">часы</option>
                {hours.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
              <select
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
                className="w-1/2 border rounded px-3 py-2"
              >
                <option value="">минуты</option>
                {minutes.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Конец
            </label>
            <div className="flex gap-2">
              <select
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="w-1/2 border rounded px-3 py-2"
              >
                <option value="">часы</option>
                {hours.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
              <select
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
                className="w-1/2 border rounded px-3 py-2"
              >
                <option value="">минуты</option>
                {minutes.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className={classNames(
            "mt-4 px-4 py-2 rounded text-white",
            editingSlot
              ? "bg-yellow-600 hover:bg-yellow-500"
              : "bg-indigo-600 hover:bg-indigo-500"
          )}
        >
          {editingSlot ? "Сохранить изменения" : "Добавить слот"}
        </button>
      </div>
    </div>
  );
}
