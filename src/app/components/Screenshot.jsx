export default function Screenshot() {
  return (
    <div className="w-full py-5  px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-6xl bg-cover bg-center text-white h-[400px]"
        style={{ backgroundImage: "url('/bg-2.jpg')" }}
      >
        <h2 className=" font-light tracking-tight text-gray-900 uppercase font-sans text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[120px] absolute z-2 -top-20 right-20 text-right">
          методы <br />
          лечения
        </h2>

        <div className="backdrop-brightness-100 w-full h-full">
          <p className="mt-5 text-pretty text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans text-right pr-22 pt-40">
            мои услуги
          </p>
        </div>
      </div>
    </div>
  );
}
