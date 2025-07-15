import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function GetInTouch() {
  return (
    <section aria-labelledby="contact-heading" className="md:pb-18 md:-mt-22">
      <div className="mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-xl lg:max-w-4xl">
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20">
            {/* Левый блок */}
            <div className="w-full md:w-1/2">
              <h2
                id="contact-heading"
                className="text-3xl md:text-6xl uppercase font-sans font-light tracking-tight text-gray-900"
              >
                Связаться <br /> с нами
              </h2>
              <p className="mt-4 text-lg/snug text-gray-600">
                Мы всегда рады помочь вам записаться на приём или ответить на
                ваши вопросы. Свяжитесь с нами удобным для вас способом.
              </p>
            </div>

            {/* Контакты */}
            <address className="not-italic bg-[#d6d8d5] p-10  shadow w-full md:w-1/2">
              <div className="space-y-6 text-base/7 text-gray-900">
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
                      aria-label="Открыть адрес Peterburi tee 2f, Tallinn, Estonia в Google Картах"
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
                    <a
                      href="tel:+37257245897"
                      className="hover:text-gray-900"
                      aria-label="Позвонить по номеру +372 5724 5897"
                    >
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
                      aria-label="Отправить электронное письмо на hulishevskyi@gmail.com"
                    >
                      hulishevskyi@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
