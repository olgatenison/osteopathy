import Image from "next/image";

const points = [
  {
    number: "01",
    title: "Остеопатия в действии",
    id: "001",
  },
  {
    number: "02",
    title: "Руслан Гулишевский",
    id: "002",
  },
  {
    number: "03",
    title: "Направления и методы",
    id: "003",
  },
  {
    number: "04",
    title: "Запись на приём",
    id: "004",
  },
];

export default function Hero() {
  return (
    <header className="max-w-6xl px-6 md:px-8 mx-auto" role="banner">
      <div className="mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-12">
        {/* Левая часть */}
        <div className="mt-40 md:mt-60 relative">
          {/* Главный заголовок */}
          <h1 className="w-full font-light tracking-tight text-gray-900 uppercase font-sans text-5xl md:text-7xl lg:text-[120px] absolute z-10 -top-10 md:-top-32 left-0 md:-left-3">
            остеопатия
          </h1>

          {/* Подзаголовок */}
          <h2 className="mt-6 md:mt-12 text-pretty text-2xl font-semibold tracking-tight text-gray-900 max-w-xl uppercase font-sans">
            это современный, мягкий и комплексный подход к восстановлению
            здоровья
          </h2>

          {/* Описание */}
          <p className="mt-4 text-lg/snug font-regular text-gray-600 max-w-md">
            Здоровье всего организма напрямую влияет на внешний вид, энергию и
            общее самочувствие. Именно поэтому так важно применять комплексный
            подход к диагностике и восстановлению опорно-двигательной системы.
          </p>

          {/* Навигация по якорям */}
          <nav
            className="mt-12 md:mt-20 divide-y divide-gray-900/10"
            aria-label="Основные разделы сайта"
          >
            <ul role="list" className="space-y-2">
              {points.map((point) => (
                <li
                  key={point.id}
                  role="listitem"
                  className="first:pt-0 last:pb-0 uppercase font-sans"
                >
                  <a
                    href={`#${point.id}`}
                    className="group flex w-full items-start justify-between text-left text-gray-900 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md transition-colors hover:text-indigo-600"
                  >
                    <span>{point.number}</span>
                    <span className="text-base/7 font-semibold">
                      {point.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Правая часть */}
        <div className="bg-indigo-500 h-[300px] sm:h-[350px] md:h-[500px] w-full  md:max-w-[450px] mt-8 md:mt-20 relative  overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Остеопат работает с пациентом"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </header>
  );
}

//1080 1258
