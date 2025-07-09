import Image from "next/image";
const points = [
  {},
  {
    number: "01",
    title: "Остеопатия в действии",
    id: "",
  },
  {
    number: "02",
    title: "Руслан Гулишевский",
    id: "",
  },
  {
    number: "03",
    title: "направления и методы",
    id: "",
  },
  {
    number: "04",
    title: "Запись на приём",
    id: "",
  },
];

export default function Help() {
  return (
    <div className="mx-auto my-24 max-w-6xl px-6 lg:px-8">
      {" "}
      <h2 className="text-6xl uppercase font-sans font-light tracking-tight text-gray-900">
        Как остеопат помогает
        <br /> телу восстановиться?
      </h2>
      <div className="mx-auto pt-12 flex justify-between gap-8">
        <div className=" max-w-lg ">
          <h2 className="mt-3 text-pretty text-2xl font-semibold tracking-tight text-gray-900 max-w-lg uppercase font-sans">
            Остеопат работает с телом с помощью мягких, точных и безопасных
            мануальных техник.
          </h2>
          <p className=" mt-8 text-lg/snug font-regular text-gray-600  max-w-md">
            Воздействуя на мышцы, суставы, фасции, позвоночник и внутренние
            органы, он улучшает подвижность тканей и способствует восстановлению
            баланса в работе нервной, кровеносной и лимфатической систем.
          </p>
        </div>
        <ul className="mt-3 list-disc list-inside text-gray-600 space-y-1  divide-y divide-gray-900/10 max-w-xl">
          <li className="first:pt-0 last:pb-0 uppercase font-sans text-base/7 font-semibold">
            Боли в спине, шее и суставах
          </li>
          <li className="first:pt-0 last:pb-0 uppercase font-sans text-base/7 font-semibold">
            Головные боли, мигрени, головокружения
          </li>
          <li className="first:pt-0 last:pb-0 uppercase font-sans text-base/7 font-semibold">
            Последствия травм и операций
          </li>
          <li className="first:pt-0 last:pb-0 uppercase font-sans text-base/7 font-semibold">
            Нарушения осанки и сколиоз
          </li>
          <li className="first:pt-0 last:pb-0 uppercase font-sans text-base/7 font-semibold">
            Проблемы с пищеварением, дыханием и сном
          </li>
          <li className="first:pt-0 last:pb-0 uppercase font-sans text-base/7 font-semibold">
            Поддержка во время беременности и после родов
          </li>
          <li className="first:pt-0 last:pb-0 uppercase font-sans text-base/7 font-semibold">
            Работа с детьми: гипертонус, родовые травмы...
          </li>
        </ul>
        {/* <div className="bg-indigo-500 h-[500px] w-[450px] mt-20 relative">
          <Image
            src="/hero.jpg"
            alt="Остеопат работает с пациентом"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div> */}
      </div>
    </div>
  );
}
