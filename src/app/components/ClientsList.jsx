// components/ClientsList.jsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*, slots(*)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ошибка при загрузке клиентов:", error);
    } else {
      setClients(data);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Список клиентов
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2 text-left">Имя</th>
              <th className="px-4 py-2 text-left">Фамилия</th>
              <th className="px-4 py-2 text-left">Телефон</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Количество</th>
              <th className="px-4 py-2 text-left">Брони + сообщения</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              const bookings = client.slots || [];

              return (
                <tr key={client.id} className="border-t align-top">
                  <td className="px-4 py-2">{client.first_name}</td>
                  <td className="px-4 py-2">{client.last_name}</td>
                  <td className="px-4 py-2">{client.phone}</td>
                  <td className="px-4 py-2">{client.email}</td>
                  <td className="px-4 py-2">{bookings.length}</td>
                  <td className="px-4 py-2">
                    {bookings.length > 0 ? (
                      <ul className="list-disc list-inside space-y-2">
                        {bookings
                          .sort((a, b) =>
                            a.date === b.date
                              ? a.start.localeCompare(b.start)
                              : a.date.localeCompare(b.date)
                          )
                          .map((slot) => (
                            <li key={slot.id}>
                              <div>
                                <strong>
                                  {slot.date}: {slot.start}–{slot.end}
                                </strong>
                              </div>
                              {slot.message && (
                                <div className="text-gray-500 text-sm italic">
                                  {slot.message}
                                </div>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
