const stats = [
  {
    id: 1,
    name: "Чувствуют улучшение уже после 1 сеанса",
    value: "9 из 10",
  },
  { id: 2, name: "Снижение хронической боли", value: "до 70%" },
  { id: 3, name: "Продолжительность одного сеанса", value: "30–40 мин" },
  { id: 4, name: "Подходит для всех возрастов", value: "0+" },
];

export default function Infografic() {
  return (
    <section
      className="pt-10 md:pt-20 pb-10"
      aria-labelledby="infographic-heading"
      id="osteopathy"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Заголовок */}
          <div className="text-center">
            <h2
              id="infographic-heading"
              className="mt-5 text-pretty text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans md:max-w-xl lg:max-w-full max-w-md mx-auto"
            >
              Данные, отражающие практический эффект
            </h2>
            <p className="mt-4 text-base md:text-lg/8 font-regular text-gray-600 mx-auto">
              Остеопатия — это не только про спину. <br /> Это про здоровье
              всего организма.
            </p>
          </div>

          {/* Список показателей */}
          <dl
            className="mt-8 md:mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Ключевые статистические показатели практики остеопатии"
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col bg-[#d6d8d5] p-6 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 transition-colors hover:bg-[#cfd1ce]"
                tabIndex="0"
              >
                {/* Значение */}
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 font-sans text-center">
                  {stat.value}
                </dd>
                {/* Подпись */}
                <dt className="mt-3 text-sm font-regular text-gray-700 text-center">
                  {stat.name}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
