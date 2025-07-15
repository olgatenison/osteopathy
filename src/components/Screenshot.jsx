export default function Screenshot() {
  return (
    <section
      className="w-full pb-8 px-6 lg:px-8"
      aria-labelledby="screenshot-heading"
    >
      <div
        className="relative mx-auto w-full max-w-6xl bg-cover bg-center text-white md:h-[400px] h-[130px] sm:h-[250px]"
        role="img"
        aria-label="Фоновое изображение с остеопатией"
        style={{ backgroundImage: "url('/bg-2.jpg')" }}
      >
        {/* Заголовок */}
        <h2
          id="screenshot-heading"
          className="font-light tracking-tight text-gray-900 uppercase font-sans text-3xl sm:text-6xl md:text-8xl absolute z-[2] -top-12 right-5 md:right-20 text-right"
        >
          направления <br />и методы
        </h2>

        {/* Подзаголовок */}
        <div className="w-full h-full">
          <p className="mt-8 text-pretty text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans text-right pr-5 md:pr-22 pt-20 md:pt-40">
            которые я практикую
          </p>
        </div>
      </div>
    </section>
  );
}
