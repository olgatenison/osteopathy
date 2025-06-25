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

export default function Hero() {
  return (
    <div className="max-w-6xl px-6 mx-auto">
      <div className="mx-auto flex flex-row justify-between gap-12">
        <div className="mt-40 relative">
          <h2 className="mt-3 text-pretty text-2xl font-semibold tracking-tight text-gray-900 max-w-xl uppercase font-sans">
            это современный, мягкий и комплексный подход к восстановлению
            здоровья
          </h2>
          <p className="mt-4 text-lg/snug font-regular text-gray-600  max-w-md">
            Здоровье всего организма напрямую влияет на внешний вид, энергию и
            общее самочувствие. Именно поэтому так важно применять комплексный
            подход к диагностике и восстановлению опорно-двигательной системы.
          </p>
          <div className="mt-20 divide-y divide-gray-900/10 ">
            {points.map((point) => (
              <div
                key={point.number}
                className="first:pt-0 last:pb-0 uppercase font-sans"
              >
                <div>
                  <div className="group flex w-full items-start justify-between text-left text-gray-900 py-2">
                    <span>{point.number}</span>
                    <span className="text-base/7 font-semibold">
                      {point.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="mt-10 w-full font-light tracking-tight text-gray-900 uppercase font-sans text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[120px] absolute z-2 -top-42 -left-3">
            остеопатия
          </h1>
        </div>

        <div className="bg-indigo-500 h-[500px] w-[450px] mt-20 relative">
          <Image
            src="/hero.jpg"
            alt="Остеопат работает с пациентом"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
//1080 1258
