"use client";
import { useState } from "react";
import { validateForm } from "@/utils/validateForm";
import { supabase } from "@/lib/supabase";
import DataDisplay from "./DataDisplay";

export default function Contacts() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      phone: formData.get("phone"),
      email: formData.get("e-mail"),
      message: formData.get("message"),
      selectedDate,
      selectedSlot,
    };

    const errors = validateForm(data);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      let clientId;

      // 1️⃣ Проверка: есть ли клиент с таким email
      const { data: existingClients, error: findError } = await supabase
        .from("clients")
        .select("id")
        .eq("email", data.email)
        .limit(1);

      if (findError) {
        console.error("❌ Ошибка при поиске клиента:", findError);
        alert("Ошибка при отправке формы. Попробуйте позже.");
        return;
      }

      if (existingClients.length > 0) {
        clientId = existingClients[0].id;
      } else {
        // 2️⃣ Добавление нового клиента
        const { data: newClient, error: clientError } = await supabase
          .from("clients")
          .insert([
            {
              first_name: data.firstName,
              last_name: data.lastName,
              phone: data.phone,
              email: data.email,
            },
          ])
          .select("id")
          .single();

        if (clientError) {
          console.error("❌ Ошибка при создании клиента:", clientError);
          alert("Ошибка при отправке формы. Попробуйте позже.");
          return;
        }

        clientId = newClient.id;
      }

      // 3️⃣ Обновление слота
      const { error: slotError } = await supabase
        .from("slots")
        .update({
          booked: true,
          client_id: clientId,
          message: data.message,
        })
        .eq("id", data.selectedSlot?.id);

      if (slotError) {
        console.error("❌ Ошибка при обновлении слота:", slotError);
        alert("Клиент сохранён, но слот не обновлён.");
      } else {
        alert("✅ Заявка успешно отправлена!");
        e.target.reset();
        setSelectedSlot(null);
        setSelectedDate(null);
      }
    } catch (err) {
      console.error("❌ Неизвестная ошибка:", err);
      alert("Произошла ошибка. Попробуйте позже.");
    }
  };

  return (
    <div id="contact" className="px-6 py-24   lg:px-8 ">
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-6xl uppercase font-sans font-light tracking-tight text-gray-900">
          Запишись на приём
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Приглашаю на приём — в комфортной, спокойной обстановке мы вместе
          подберём подход, который поможет вам восстановить подвижность, снизить
          напряжение и почувствовать себя лучше.
        </p>

        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row bg-gray-50 p-8">
          <form onSubmit={handleSubmit} className="lg:flex-auto">
            <DataDisplay
              onSlotChange={setSelectedSlot}
              onDateChange={setSelectedDate}
            />
            {formErrors.selectedDate && (
              <p className="text-sm text-red-600">{formErrors.selectedDate}</p>
            )}
            {formErrors.selectedSlot && (
              <p className="text-sm text-red-600">{formErrors.selectedSlot}</p>
            )}

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Сообщение
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                    defaultValue=""
                  />
                </div>
              </div>

              {[
                {
                  id: "first-name",
                  label: "Имя",
                  autoComplete: "given-name",
                  error: "firstName",
                },
                {
                  id: "last-name",
                  label: "Фамилия",
                  autoComplete: "family-name",
                  error: "lastName",
                },
                {
                  id: "phone",
                  label: "Номер телефона",
                  autoComplete: "tel",
                  error: "phone",
                },
                {
                  id: "e-mail",
                  label: "Электронная почта",
                  autoComplete: "email",
                  error: "email",
                },
              ].map(({ id, label, autoComplete, error }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-semibold text-gray-900"
                  >
                    {label}
                  </label>
                  <div className="mt-2.5">
                    <input
                      id={id}
                      name={id}
                      type="text"
                      autoComplete={autoComplete}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                    />
                    {formErrors[error] && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors[error]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-gray-800 px-3.5 py-3 text-center text-lg font-semibold text-white hover:bg-[#a1a49f]  focus-visible:outline-gray-800 uppercase"
              >
                Отправить
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Отправляя форму, вы соглашаетесь с{" "}
              <a href="/privacy" className="font-bold text-gray-900">
                политикой конфиденциальности
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
