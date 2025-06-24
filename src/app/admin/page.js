// app/admin/page.tsx или page.jsx
"use client";

import { useEffect, useState } from "react";
import AdminSlots from "../components/AdminSlots";
import AdminSlotTable from "../components/AdminSlotTable";

export default function AdminPage() {
  const [slots, setSlots] = useState({});
  const [editingSlot, setEditingSlot] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("appointmentSlots");
    if (saved) {
      setSlots(JSON.parse(saved));
    }
  }, []);

  const handleAddSlot = (date, newSlot, index = null) => {
    const updated = { ...slots };
    if (!updated[date]) updated[date] = [];

    if (index !== null) {
      updated[date][index] = newSlot;
    } else {
      updated[date].push(newSlot);
    }

    setSlots(updated);
    localStorage.setItem("appointmentSlots", JSON.stringify(updated));
    setEditingSlot(null);
  };

  const handleDeleteSlot = (date, index) => {
    const updated = { ...slots };
    updated[date].splice(index, 1);
    if (updated[date].length === 0) {
      delete updated[date];
    }
    setSlots(updated);
    localStorage.setItem("appointmentSlots", JSON.stringify(updated));
  };

  const handleEditSlot = ({ date, index, slot }) => {
    setEditingSlot({ date, index, slot });
  };

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
    </div>
  );
}
