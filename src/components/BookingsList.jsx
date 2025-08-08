"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  PlusSmallIcon,
  MinusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalDateTime, setModalDateTime] = useState("");

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
      .eq("booked", true);

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

  const openMessageModal = (message, datetime) => {
    setModalMessage(message);
    setModalDateTime(datetime);
    setModalOpen(true);
  };

  // Группировка по дате
  const grouped = {};
  bookings.forEach((slot) => {
    if (!grouped[slot.date]) grouped[slot.date] = [];
    grouped[slot.date].push(slot);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="mt-16 rounded-lg bg-white px-6 py-8 shadow">
      <h2 className="text-lg font-semibold text-gray-900">Бронирования</h2>
      <p className="mt-1 text-sm text-gray-600">
        Список всех актуальных бронирований с данными клиентов.
      </p>

      {loading ? (
        <p className="mt-4 text-sm text-gray-500">Загрузка...</p>
      ) : sortedDates.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">Бронирований пока нет.</p>
      ) : (
        <div className="mt-6 divide-y divide-gray-200">
          {sortedDates.map((date) => (
            <Disclosure key={date} as="div" className="py-4">
              <DisclosureButton className="flex w-full items-center justify-between text-left text-sm font-medium text-gray-900 hover:underline">
                <span>{date}</span>
                <span className="ml-4">
                  <PlusSmallIcon className="h-5 w-5 group-data-[open]:hidden" />
                  <MinusSmallIcon className="h-5 w-5 group-[&:not([data-open])]:hidden" />
                </span>
              </DisclosureButton>
              <DisclosurePanel className="mt-3">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Время
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Клиент
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Контакты
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Сообщение
                        </th>
                        <th className="px-4 py-2 text-right font-medium text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {grouped[date]
                        .sort((a, b) => a.start.localeCompare(b.start))
                        .map((slot) => (
                          <tr key={slot.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap">
                              {slot.start} – {slot.end}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              {slot.client?.first_name} {slot.client?.last_name}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                              <div>{slot.client?.phone}</div>
                              <div className="text-xs text-gray-500">
                                {slot.client?.email}
                              </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              {slot.message ? (
                                <button
                                  onClick={() =>
                                    openMessageModal(
                                      slot.message,
                                      `${slot.date}, ${slot.start}–${slot.end}`
                                    )
                                  }
                                  className="text-indigo-600 hover:underline text-xs"
                                >
                                  Показать
                                </button>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-2 text-right">
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
              </DisclosurePanel>
            </Disclosure>
          ))}
        </div>
      )}

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
            <p className="mb-2 text-sm text-gray-500">{modalDateTime}</p>
            <div className="rounded bg-gray-50 p-4 text-gray-800 text-sm whitespace-pre-line">
              {modalMessage}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
