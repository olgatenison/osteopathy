// components/ClientsList.jsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalDatetime, setModalDatetime] = useState("");

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

  const openMessage = (message, datetime) => {
    setModalMessage(message);
    setModalDatetime(datetime);
    setModalOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-16">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold text-gray-900">Клиенты</h2>
          <p className="mt-2 text-sm text-gray-700">
            Список клиентов и все их бронирования с возможностью просмотра
            сообщений.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Имя
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Фамилия
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Телефон
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Кол-во броней
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Брони
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => {
                  const bookings = client.slots || [];

                  return (
                    <tr key={client.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 ">
                        {client.first_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {client.last_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {client.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {client.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {bookings.length}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-700">
                        {bookings.length > 0 ? (
                          <ul className="space-y-2">
                            {bookings
                              .sort((a, b) =>
                                a.date === b.date
                                  ? a.start.localeCompare(b.start)
                                  : a.date.localeCompare(b.date)
                              )
                              .map((slot) => (
                                <li key={slot.id}>
                                  <div className="font-medium">
                                    {slot.date}: {slot.start}–{slot.end}
                                  </div>
                                  {slot.message && (
                                    <button
                                      onClick={() =>
                                        openMessage(
                                          slot.message,
                                          `${slot.date}, ${slot.start}–${slot.end}`
                                        )
                                      }
                                      className="text-indigo-600 hover:underline text-xs"
                                    >
                                      Показать сообщение
                                    </button>
                                  )}
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Модалка для сообщения */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Сообщение клиента
              </DialogTitle>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-2 text-sm text-gray-500">{modalDatetime}</p>
            <div className="rounded bg-gray-50 p-4 text-gray-800 text-sm whitespace-pre-line">
              {modalMessage}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
