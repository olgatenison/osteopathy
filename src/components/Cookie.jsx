"use client";

import { useState, useEffect, useRef } from "react";

export default function Cookie() {
  const [isVisible, setIsVisible] = useState(false);
  const acceptButtonRef = useRef(null);

  useEffect(() => {
    // Проверяем только в браузере
    if (typeof window !== "undefined") {
      const cookieConsent = localStorage.getItem("cookieConsent");
      console.log("cookieConsent:", cookieConsent); // 👀 Лог
      if (!cookieConsent) {
        setIsVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isVisible && acceptButtonRef.current) {
      acceptButtonRef.current.focus();
    }
  }, [isVisible]);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className=" fixed z-50 inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-gray-900/10 lg:flex-row lg:items-center lg:px-8 shadow-xl"
    >
      <div className="mr-0 lg:mr-24 ">
        <h3 id="cookie-title" className="text-lg font-semibold mb-2 uppercase">
          Мы используем cookies
        </h3>
        <p className="max-w-xl lg:max-w-3xl text-base font-light text-gray-900 pb-8">
          Этот сайт использует файлы cookie для улучшения работы и удобства
          пользователей. Продолжая использовать сайт, вы соглашаетесь с
          использованием cookies.
        </p>
      </div>
      <div className="flex items-center gap-x-6">
        <button
          type="button"
          ref={acceptButtonRef}
          onClick={handleAccept}
          className="rounded-md bg-gray-900 px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
        >
          Принять
        </button>
        <button
          type="button"
          onClick={handleReject}
          className="text-base font-light text-gray-600 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
        >
          Отклонить
        </button>
      </div>
    </div>
  );
}
