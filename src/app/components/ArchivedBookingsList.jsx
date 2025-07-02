"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MessageModal from "./MessageModal";

export default function ArchivedBookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("slots")
      .select(
        `
        id,
        date,
        start,
        end,
        message,
        client:client_id (
          id,
          first_name,
          last_name,
          phone,
          email
        )
      `
      )
      .eq("booked", true)
      .order("date", { ascending: false })
      .order("start", { ascending: false });

    if (error) {
      console.error("Ошибка загрузки архива:", error);
    } else {
      const now = new Date();
      const filtered = data.filter((slot) => {
        const slotEnd = new Date(`${slot.date}T${slot.end}`);
        return slotEnd < now;
      });

      setBookings(filtered);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Архив бронирований
      </h2>

      {loading ? (
        <p className="text-sm text-gray-500">Загрузка...</p>
      ) : bookings.length === 0 ? (
        <p className="text-sm text-gray-500">Архив пока пуст.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Дата
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Время
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Клиент
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Контакты
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Сообщение
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((slot) => (
                <tr key={slot.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{slot.date}</td>
                  <td className="px-4 py-2">
                    {slot.start} – {slot.end}
                  </td>
                  <td className="px-4 py-2">
                    {slot.client?.first_name} {slot.client?.last_name}
                  </td>
                  <td className="px-4 py-2">
                    <div>{slot.client?.phone}</div>
                    <div className="text-gray-500 text-xs">
                      {slot.client?.email}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {slot.message ? (
                      <button
                        onClick={() => setActiveMessage(slot.message)}
                        className="text-indigo-600 hover:underline text-xs"
                      >
                        Посмотреть
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MessageModal
        message={activeMessage}
        onClose={() => setActiveMessage(null)}
      />
    </div>
  );
}
