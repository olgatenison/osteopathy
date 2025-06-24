"use client";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
  format,
  addDays,
} from "date-fns";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DataDisplay() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

  const days = [];
  let day = start;

  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handlePrev = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNext = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 mb-8">
      {/* Calendar */}
      <div className="pr-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            {format(currentMonth, "LLLL yyyy")}
          </h2>
          <div className="flex gap-2">
            <button type="button" onClick={handlePrev}>
              <ChevronLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>

            <button type="button" onClick={handleNext}>
              <ChevronRightIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 text-center text-xs text-gray-500">
          {["П", "В", "С", "Ч", "П", "С", "В"].map((day, idx) => (
            <div key={idx}>{day}</div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((dayItem, idx) => {
            const isSelected =
              selectedDate &&
              format(dayItem, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");

            return (
              <div
                key={dayItem.toString()}
                className={classNames(
                  idx >= 7 && "border-t border-gray-200",
                  "py-2"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDate(dayItem)}
                  className={classNames(
                    isSelected && "bg-indigo-600 text-white",
                    !isSelected && isToday(dayItem) && "text-indigo-600",
                    !isSelected &&
                      !isToday(dayItem) &&
                      isSameMonth(dayItem, currentMonth) &&
                      "text-gray-900",
                    !isSameMonth(dayItem, currentMonth) && "text-gray-400",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
                  )}
                >
                  <time dateTime={format(dayItem, "yyyy-MM-dd")}>
                    {format(dayItem, "d")}
                  </time>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side – можно подставлять время / тип услуги и т.д. */}
      <div className="md:pl-6 mt-10 md:mt-0">
        <div>
          <label
            htmlFor="serviceType"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            тип услуги
          </label>
          <div className="mt-2.5">
            <select
              name="serviceType"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline  outline-gray-300 focus:outline-2 focus:outline-indigo-600"
            >
              <option disabled selected value="">
                Выберите услугу
              </option>
              <option value="classic">Классический массаж</option>
              <option value="therapeutic">Терапевтический массаж</option>
              <option value="craniosacral">Краниосакральная терапия</option>
              <option value="visceral">Висцеральная терапия</option>
            </select>
          </div>
        </div>
        {selectedDate && (
          <>
            <h2 className="mt-8 text-base font-semibold text-gray-900 mb-4">
              Доступное время на{" "}
              {format(selectedDate, "dd MMMM yyyy", { locale: undefined })}
            </h2>
            {/* Здесь можно подставить список слотов из базы / API */}
            <ul className="space-y-2 text-sm text-gray-700">
              <li>10:00 – 10:30</li>
              <li>11:00 – 11:40</li>
              <li>13:00 – 13:30</li>
            </ul>
          </>
        )}
        {!selectedDate && (
          <p className="text-sm text-gray-500">Выберите дату слева</p>
        )}
      </div>
    </div>
  );
}

// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

// const days = [
//   { date: "2021-12-27" },
//   { date: "2021-12-28" },
//   { date: "2021-12-29" },
//   { date: "2021-12-30" },
//   { date: "2021-12-31" },
//   { date: "2022-01-01", isCurrentMonth: true },
//   { date: "2022-01-02", isCurrentMonth: true },
//   { date: "2022-01-03", isCurrentMonth: true },
//   { date: "2022-01-04", isCurrentMonth: true },
//   { date: "2022-01-05", isCurrentMonth: true },
//   { date: "2022-01-06", isCurrentMonth: true },
//   { date: "2022-01-07", isCurrentMonth: true },
//   { date: "2022-01-08", isCurrentMonth: true },
//   { date: "2022-01-09", isCurrentMonth: true },
//   { date: "2022-01-10", isCurrentMonth: true },
//   { date: "2022-01-11", isCurrentMonth: true },
//   { date: "2022-01-12", isCurrentMonth: true, isToday: true },
//   { date: "2022-01-13", isCurrentMonth: true },
//   { date: "2022-01-14", isCurrentMonth: true },
//   { date: "2022-01-15", isCurrentMonth: true },
//   { date: "2022-01-16", isCurrentMonth: true },
//   { date: "2022-01-17", isCurrentMonth: true },
//   { date: "2022-01-18", isCurrentMonth: true },
//   { date: "2022-01-19", isCurrentMonth: true },
//   { date: "2022-01-20", isCurrentMonth: true },
//   { date: "2022-01-21", isCurrentMonth: true, isSelected: true },
//   { date: "2022-01-22", isCurrentMonth: true },
//   { date: "2022-01-23", isCurrentMonth: true },
//   { date: "2022-01-24", isCurrentMonth: true },
//   { date: "2022-01-25", isCurrentMonth: true },
//   { date: "2022-01-26", isCurrentMonth: true },
//   { date: "2022-01-27", isCurrentMonth: true },
//   { date: "2022-01-28", isCurrentMonth: true },
//   { date: "2022-01-29", isCurrentMonth: true },
//   { date: "2022-01-30", isCurrentMonth: true },
//   { date: "2022-01-31", isCurrentMonth: true },
//   { date: "2022-02-01" },
//   { date: "2022-02-02" },
//   { date: "2022-02-03" },
//   { date: "2022-02-04" },
//   { date: "2022-02-05" },
//   { date: "2022-02-06" },
// ];
// const meetings = [
//   {
//     id: 1,

//     start: "1:00 PM",
//     startDatetime: "2022-01-21T13:00",
//     end: "1:30 PM",
//     endDatetime: "2022-01-21T14:30",
//   },
//   {
//     id: 2,

//     start: "1:30 PM",
//     startDatetime: "2022-01-21T13:00",
//     end: "2:00 PM",
//     endDatetime: "2022-01-21T14:30",
//   },
//   {
//     id: 3,

//     start: "2:00 PM",
//     startDatetime: "2022-01-21T13:00",
//     end: "2:30 PM",
//     endDatetime: "2022-01-21T14:30",
//   },
//   // More meetings...
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function DataDisplay() {
//   return (
//     <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
//       <div className="">
//         <div className="flex items-center">
//           <h2 className="flex-auto text-sm font-semibold text-gray-900">
//             January 2022
//           </h2>
//           <button
//             type="button"
//             className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
//           >
//             <span className="sr-only">Previous month</span>
//             <ChevronLeftIcon className="size-5" aria-hidden="true" />
//           </button>
//           <button
//             type="button"
//             className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
//           >
//             <span className="sr-only">Next month</span>
//             <ChevronRightIcon className="size-5" aria-hidden="true" />
//           </button>
//         </div>
//         <div className="mt-10 grid grid-cols-7 text-center text-xs/6 text-gray-500 ">
//           <div>П</div>
//           <div>В</div>
//           <div>С</div>
//           <div>Ч</div>
//           <div>П</div>
//           <div>С</div>
//           <div>В</div>
//         </div>
//         <div className="mt-2 grid grid-cols-7 text-sm">
//           {days.map((day, dayIdx) => (
//             <div
//               key={day.date}
//               className={classNames(
//                 dayIdx > 6 && "border-t border-gray-200",
//                 "py-2"
//               )}
//             >
//               <button
//                 type="button"
//                 className={classNames(
//                   day.isSelected && "text-white",
//                   !day.isSelected && day.isToday && "text-indigo-600",
//                   !day.isSelected &&
//                     !day.isToday &&
//                     day.isCurrentMonth &&
//                     "text-gray-900",
//                   !day.isSelected &&
//                     !day.isToday &&
//                     !day.isCurrentMonth &&
//                     "text-gray-400",
//                   day.isSelected && day.isToday && "bg-indigo-600",
//                   day.isSelected && !day.isToday && "bg-gray-900",
//                   !day.isSelected && "hover:bg-gray-200",
//                   (day.isSelected || day.isToday) && "font-semibold",
//                   "mx-auto flex size-8 items-center justify-center rounded-full"
//                 )}
//               >
//                 <time dateTime={day.date}>
//                   {day.date.split("-").pop().replace(/^0/, "")}
//                 </time>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <section className="mt-12 md:mt-0 md:pl-14">
//         {" "}
//         <div>
//           <label
//             htmlFor=""
//             className="block text-sm/6 font-semibold text-gray-900"
//           >
//             тип услуги
//           </label>
//           <div className="mt-2.5">
//             <input
//               id="e-mail"
//               name="e-mail"
//               type="url"
//               className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
//             />
//           </div>
//         </div>
//         <h2 className="my-5 text-base font-semibold text-gray-900">
//           свободные окошки на{" "}
//           <time dateTime="2022-01-21">January 21, 2022</time>
//         </h2>
//         <ol className=" flex flex-col text-sm/6 text-gray-500">
//           {meetings.map((meeting) => (
//             <li
//               key={meeting.id}
//               className="group flex items-center  rounded-xl  py-2 focus-within:bg-gray-100 hover:bg-gray-100"
//             >
//               <div className="flex items-center gap-5">
//                 <div className="mt-0.5 h-2 w-2 bg-gray-900 rounded-full"></div>
//                 <p className="mt-0.5">
//                   <time dateTime={meeting.startDatetime}>{meeting.start}</time>{" "}
//                   - <time dateTime={meeting.endDatetime}>{meeting.end}</time>
//                 </p>
//               </div>
//               <Menu
//                 as="div"
//                 className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
//               >
//                 <div>
//                   <MenuButton className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
//                     <span className="sr-only">Open options</span>
//                     <EllipsisVerticalIcon
//                       className="size-6"
//                       aria-hidden="true"
//                     />
//                   </MenuButton>
//                 </div>

//                 <MenuItems
//                   transition
//                   className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                 >
//                   <div className="py-1">
//                     <MenuItem>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
//                       >
//                         Edit
//                       </a>
//                     </MenuItem>
//                     <MenuItem>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
//                       >
//                         Cancel
//                       </a>
//                     </MenuItem>
//                   </div>
//                 </MenuItems>
//               </Menu>
//             </li>
//           ))}
//         </ol>
//       </section>
//     </div>
//   );
// }
