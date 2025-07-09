"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MessageModal({ message, onClose }) {
  return (
    <Dialog open={!!message} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Сообщение клиента
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {message}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
