"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabase/client";
import { useRouter } from "next/navigation";
import AdminSlots from "./AdminSlots";
import AdminSlotTable from "./AdminSlotTable";
import BookingsList from "../../components/BookingsList";
import ArchivedBookingsList from "./ArchivedBookingsList";
import ClientsList from "../../components/ClientsList";

import {
  Bars3Icon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon,
  UsersIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { Menu } from "@headlessui/react";

const navigation = [
  { name: "Слоты", key: "slots", icon: CalendarIcon },
  { name: "Бронирования", key: "bookings", icon: DocumentDuplicateIcon },
  { name: "Архив", key: "archive", icon: ArchiveBoxIcon },
  { name: "Клиенты", key: "clients", icon: UsersIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminContent() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("slots");
  const [slots, setSlots] = useState({});
  const [editingSlot, setEditingSlot] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("slots")
      .select("*")
      .order("date", { ascending: true })
      .order("start", { ascending: true });

    if (error) {
      console.error("Ошибка при загрузке слотов:", error);
      return;
    }

    const grouped = {};
    data.forEach((slot) => {
      if (!grouped[slot.date]) grouped[slot.date] = [];
      grouped[slot.date].push(slot);
    });

    setSlots(grouped);
  };

  const handleAddSlot = async (date, newSlot) => {
    if (editingSlot) {
      const slotToUpdate = slots[editingSlot.date][editingSlot.index];
      const { error } = await supabase
        .from("slots")
        .update({
          start: newSlot.start,
          end: newSlot.end,
          date,
        })
        .eq("id", slotToUpdate.id);

      if (error) {
        console.error("Ошибка обновления:", error.message);
      } else {
        setEditingSlot(null);
        fetchData();
      }
    } else {
      const { error } = await supabase.from("slots").insert([
        {
          date,
          start: newSlot.start,
          end: newSlot.end,
          booked: false,
          client_id: null,
        },
      ]);

      if (error) {
        console.error("Ошибка добавления:", error.message);
      } else {
        fetchData();
      }
    }
  };

  const handleDeleteSlot = async (date, index) => {
    const slot = slots[date][index];
    if (!slot?.id) return;

    const { error } = await supabase.from("slots").delete().eq("id", slot.id);
    if (error) console.error("Ошибка удаления:", error);

    fetchData();
  };

  const handleEditSlot = ({ date, index, slot }) => {
    setEditingSlot({ date, index, slot });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); // деавторизуем на клиенте (очищает сессию в localStorage/cookie)
    router.push("/login"); // перенаправляем на экран входа
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden ${
          sidebarOpen ? "" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex w-64 flex-col bg-gray-900 text-white">
          <div className="flex items-center justify-between p-4">
            <span className="text-lg font-bold">Меню</span>
            <XMarkIcon
              onClick={() => setSidebarOpen(false)}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <nav className="flex flex-col gap-2 px-4">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setSidebarOpen(false);
                }}
                className={classNames(
                  activeTab === item.key
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-gray-900 text-white">
        <div className="p-6 font-bold text-lg">Админ-панель</div>
        <nav className="flex flex-col gap-2 px-4">
          {navigation.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={classNames(
                activeTab === item.key
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Bars3Icon className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-lg font-semibold">Админ панель</span>
          </div>
          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="relative flex items-center">
              <span className="sr-only">Открыть меню пользователя</span>
              <img
                alt="admin"
                src="/admin.jpg"
                className="size-8 rounded-full bg-gray-50"
              />
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold text-gray-900">
                  Админ
                </span>
                <ChevronDownIcon className="ml-2 size-5 text-gray-400" />
              </span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block w-full px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Выйти
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        <main className="p-6">
          {activeTab === "slots" && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Управление слотами
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <AdminSlots
                    onSlotAdd={handleAddSlot}
                    editingSlot={editingSlot}
                  />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <AdminSlotTable
                    slots={slots}
                    onSlotDelete={handleDeleteSlot}
                    onEditSlot={handleEditSlot}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "bookings" && <BookingsList />}
          {activeTab === "archive" && <ArchivedBookingsList />}
          {activeTab === "clients" && <ClientsList />}
        </main>
      </div>
    </div>
  );
}
