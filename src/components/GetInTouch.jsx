import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function GetInTouch() {
  return (
    <div className="pb-18 -mt-22">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl lg:max-w-4xl divide-y divide-gray-100 ">
          <div className="flex flex-row justify-center gap-20">
            <div className="w-1/2">
              <h2 className="text-6xl uppercase font-sans font-light tracking-tight text-gray-900">
                Связаться <br />с нами
              </h2>
              <p className="mt-4 text-lg text-gray-600 ">
                Мы всегда рады помочь вам записаться на приём или ответить на
                ваши вопросы. Свяжитесь с нами удобным для вас способом.
              </p>
            </div>

            <div className=" bg-[#d6d8d5] p-10">
              <div className=" space-y-4 text-base/7 text-gray-900">
                {/* Адрес */}
                <div className="flex gap-x-4">
                  <div className="flex-none">
                    <span className="sr-only">Адрес</span>
                    <BuildingOffice2Icon
                      aria-hidden="true"
                      className="h-7 w-6 text-gray-900"
                    />
                  </div>
                  <div>
                    Peterburi tee 2f, Tallinn, Estonia
                    <br />
                    <a
                      href="https://maps.google.com/?q=Peterburi+tee+2f+Tallinn+Estonia"
                      className="text-gray-900 block mt-1 hover:underline font-semibold uppercase"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      открыть в Google Картах
                    </a>
                  </div>
                </div>

                {/* Телефон */}
                <div className="flex gap-x-4">
                  <div className="flex-none">
                    <span className="sr-only">Телефон</span>
                    <PhoneIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-gray-900"
                    />
                  </div>
                  <div>
                    <a href="tel:+37257245897" className="hover:text-gray-900">
                      +372 5724 5897
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-x-4">
                  <div className="flex-none">
                    <span className="sr-only">Электронная почта</span>
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-gray-900"
                    />
                  </div>
                  <div>
                    <a
                      href="mailto:hulishevskyi@gmail.com"
                      className="hover:text-gray-900"
                    >
                      hulishevskyi@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
