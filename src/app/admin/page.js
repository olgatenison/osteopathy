// app/admin/page.tsx или page.jsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminSlots from "../components/AdminSlots";
import AdminSlotTable from "../components/AdminSlotTable";
import BookingsList from "../components/BookingsList";
import ClientsList from "../components/ClientsList";

export default function AdminPage() {
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
      .order("start", { ascending: true }); // ← добавляем сортировку по времени

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

  const handleAddSlot = async (date, newSlot, index = null) => {
    if (editingSlot) {
      // режим редактирования → обновляем по id
      const slotToUpdate = slots[editingSlot.date][editingSlot.index];

      const { error } = await supabase
        .from("slots")
        .update({
          start: newSlot.start,
          end: newSlot.end,
          date: date,
        })
        .eq("id", slotToUpdate.id);

      if (error) {
        console.error("❌ Ошибка обновления:", error.message || error);
      } else {
        console.log("✅ Обновлено слот с id:", slotToUpdate.id);
        setEditingSlot(null);
        fetchData();
      }
    } else {
      // режим добавления → вставляем новый
      const slotToInsert = {
        date,
        start: newSlot.start,
        end: newSlot.end,
        booked: newSlot.booked ?? false,
        client_id: null,
      };

      const { data, error } = await supabase
        .from("slots")
        .insert([slotToInsert])
        .select();

      if (error) {
        console.error("❌ Ошибка добавления:", error.message || error);
      } else {
        console.log("✅ Добавлено:", data);
        setEditingSlot(null);
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

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Панель администратора
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <AdminSlots onSlotAdd={handleAddSlot} editingSlot={editingSlot} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <AdminSlotTable
            slots={slots}
            onSlotDelete={handleDeleteSlot}
            onEditSlot={handleEditSlot}
          />
        </div>
      </div>
      <BookingsList />
      <ClientsList />
    </div>
  );
}
