const problems = [
  "Боли в спине, шее и суставах",
  "Головные боли, мигрени, головокружения",
  "Последствия травм и операций",
  "Нарушения осанки и сколиоз",
  "Проблемы с пищеварением, дыханием и сном",
  "Поддержка во время беременности и после родов",
  "Работа с детьми: гипертонус, родовые травмы...",
];

export default function Help() {
  return (
    <div className="mx-auto my-12 lg:my-24 max-w-6xl px-6 lg:px-8">
      {/* Главный заголовок */}
      <h2 className="text-3xl md:text-6xl uppercase font-sans font-light tracking-tight text-gray-900">
        Как остеопат помогает
        <br /> телу восстановиться?
      </h2>

      <div className="mx-auto lg:pt-12 flex justify-center md:justify-between lg:flex-row flex-col gap-8">
        {/* Текстовый блок */}
        <div className="max-w-lg">
          <p className="mt-3 text-pretty text-2xl font-semibold tracking-tight text-gray-900 max-w-lg uppercase font-sans">
            Остеопат работает с телом с помощью мягких, точных и безопасных
            мануальных техник.
          </p>
          <p className="mt-8 text-lg/snug font-regular text-gray-600 max-w-md">
            Воздействуя на мышцы, суставы, фасции, позвоночник и внутренние
            органы, он улучшает подвижность тканей и способствует восстановлению
            баланса в работе нервной, кровеносной и лимфатической систем.
          </p>
        </div>

        {/* Список проблем */}
        <ul
          className="mt-3 list-disc list-inside text-gray-600 space-y-1 divide-y divide-gray-900/20 max-w-xl mr-0 md:self-end "
          role="list"
          aria-label="Проблемы, с которыми помогает остеопат"
        >
          {problems.map((item, index) => (
            <li
              key={index}
              className="first:pt-0 last:pb-0 uppercase font-sans text-base/7 font-semibold "
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
