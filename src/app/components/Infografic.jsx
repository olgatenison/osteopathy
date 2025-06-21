const stats = [
  {
    id: 1,
    name: "чувствуют улучшение уже после 1 сеанса",
    value: "9 из 10",
  },
  { id: 2, name: "Снижение хронической боли", value: "до 70%" },
  { id: 3, name: "Продолжительность одного сеанса", value: "30 - 40 мин" },
  { id: 4, name: "Подходит для всех возрастов", value: "0+" },
];

export default function Infografic() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="mt-5 text-pretty text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans ">
              Цифры, которые говорят сами за себя
            </h2>
            <p className="mt-4 text-lg/snug font-regular text-gray-600 ">
              Остеопатия — это не только про спину. Это про здоровье всего
              организма.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-1 overflow-hidden text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-[#d6d8d5] p-4">
                <dt className="text-sm  mt-3 font-regular text-gray-600 ">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 font-sans">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
