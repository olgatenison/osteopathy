export default function Screenshot() {
  return (
    <div className="w-full pb-8  px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-6xl bg-cover bg-center text-white h-[400px]"
        style={{ backgroundImage: "url('/bg-2.jpg')" }}
      >
        <h2 className=" font-light tracking-tight text-gray-900 uppercase font-sans text-4xl sm:text-8xl  absolute z-2 -top-12 right-20 text-right">
          направления <br />и методы
        </h2>

        <div className="backdrop-brightness-100 w-full h-full">
          <p className="mt-8 text-pretty text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans text-right pr-22 pt-40">
            которые я практикую
          </p>
        </div>
      </div>
    </div>
  );
}
