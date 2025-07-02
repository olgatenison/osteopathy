"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .order("date", { ascending: true })
      .order("start", { ascending: true });

    if (error) {
      console.error("Ошибка загрузки броней:", error);
    } else {
      setBookings(data);
    }

    setLoading(false);
  };

  const clearBooking = async (slotId) => {
    const { error } = await supabase
      .from("slots")
      .update({
        booked: false,
        client_id: null,
        message: "",
      })
      .eq("id", slotId);

    if (error) {
      alert("Ошибка при очистке брони");
      console.error("Ошибка очистки:", error);
    } else {
      await fetchBookings();
    }
  };

  return (
    <div className="mt-16 bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Список бронирований</h2>

      {loading ? (
        <p className="text-sm text-gray-500">Загрузка...</p>
      ) : bookings.length === 0 ? (
        <p className="text-sm text-gray-500">Бронирований пока нет.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="p-2 font-medium text-gray-600">Дата</th>
                <th className="p-2 font-medium text-gray-600">Время</th>
                <th className="p-2 font-medium text-gray-600">Клиент</th>
                <th className="p-2 font-medium text-gray-600">Контакты</th>
                <th className="p-2 font-medium text-gray-600">Сообщение</th>
                <th className="p-2 font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((slot) => (
                <tr key={slot.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{slot.date}</td>
                  <td className="p-2">
                    {slot.start} – {slot.end}
                  </td>
                  <td className="p-2">
                    {slot.client?.first_name} {slot.client?.last_name}
                  </td>
                  <td className="p-2">
                    <div>{slot.client?.phone}</div>
                    <div className="text-gray-500">{slot.client?.email}</div>
                  </td>
                  <td className="p-2">
                    {slot.message ? (
                      <span className="text-gray-800">{slot.message}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => clearBooking(slot.id)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Очистить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
