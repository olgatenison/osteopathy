export default function About() {
  return (
    <section
      className="mx-auto mb-20 max-w-6xl px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto flex justify-between gap-6 lg:gap-12 items-end md:flex-row flex-col">
        {/* Фото */}
        <div className="w-full lg:max-w-lg lg:flex-auto">
          <img
            alt="Остеопат Руслан"
            src="/ruslan2.jpg"
            className="aspect-[5/6] w-full bg-gray-50 object-cover lg:aspect-auto lg:h-[38rem]"
          />
        </div>

        {/* Основной текст */}
        <div className="w-full lg:max-w-xl lg:flex-auto md:pl-12">
          <h2
            id="about-heading"
            className="text-4xl md:text-6xl uppercase font-sans font-light tracking-tight text-gray-900"
          >
            Руслан <br />
            Гулишевский
          </h2>
          <p className="mt-12 text-lg/snug font-regular text-gray-600">
            Я — практикующий остеопат и член{" "}
            <a
              href="https://www.e-boa.ee/osteopaatid/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Перейти на сайт Baltic Osteopathic Association"
              className="font-semibold tracking-tight text-gray-900 hover:underline focus:underline"
            >
              Baltic Osteopathic Association
            </a>
            . В своей практике я опираюсь на ценности современной остеопатии —
            целостный подход, уважение к телу и создание доверительной,
            безопасной атмосферы для каждого.
          </p>
        </div>
      </div>

      {/* Больше обо мне */}
      <div className="mt-12 md:pl-70 border-b border-gray-900/10 pb-4 md:pb-12">
        <h3 className="md:mt-5 text-pretty text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans">
          Больше обо мне
        </h3>
        <p className="mt-4 text-lg/snug font-regular text-gray-600">
          Остеопатия вдохновила меня, потому что я верю: тело обладает глубокой
          способностью к самовосстановлению, если создать для этого условия. Моя
          цель — не просто устранить симптом, а найти индивидуальный путь к
          улучшению самочувствия, восстановлению подвижности и внутреннего
          равновесия. Если вы чувствуете, что нуждаетесь в поддержке — или
          просто хотите лучше понимать своё тело, — буду рад помочь.
        </p>
      </div>
    </section>
  );
}
