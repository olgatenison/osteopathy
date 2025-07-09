export default function Privacy() {
  return (
    <div className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <a
          href="/"
          className=" text-gray-900  font-bold text-lg hover:underline "
        >
          На главную
        </a>
        <h1 className="text-3xl lg:text-6xl uppercase font-sans font-light tracking-tight text-gray-900 mt-10">
          Политика конфиденциальности{" "}
          <span className=" lg:mt-5 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans block">
            и обработки персональных данных
          </span>
        </h1>
        <div>
          <h2 className="mt-10 text-pretty text-md lg:text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans">
            1. Общие положения
          </h2>

          <p className="mt-6 text-base lg:text-xl/8">
            Настоящая политика конфиденциальности (далее — «Политика»)
            регулирует порядок обработки и защиты персональных данных физических
            лиц в соответствии с Регламентом (ЕС) 2016/679 Европейского
            парламента и Совета от 27 апреля 2016 года о защите физических лиц
            при обработке персональных данных и о свободном перемещении таких
            данных (GDPR). Настоящая Политика применяется ко всей информации,
            которую мы можем получить о пользователях веб-сайта{" "}
            <strong>https://thismywebsite.com</strong> (далее — «Сайт»).
          </p>
        </div>
        <div className="mt-10 ">
          <h2 className="mt-10 text-pretty text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans">
            2. Оператор и контактные данные
          </h2>
          <p className="mt-6">
            Оператор (Контролер): Руслан Гулишевский Адрес: Peterburi tee 2f,
            Tallinn, Estonia Электронная почта для связи по вопросам обработки
            данных: <strong>hulishevskyi@gmail.com</strong>
          </p>
        </div>

        <div className="mt-10 ">
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            3. Цели обработки персональных данных
          </h2>
          <ul className="mt-6 list-disc list-inside space-y-2 text-gray-700">
            <li>обработка заявок и обращений через формы на сайте</li>
            <li>предоставление услуг и исполнение договорных обязательств</li>
            <li>
              отправка информационных и маркетинговых сообщений (при наличии
              согласия)
            </li>
            <li>
              соблюдение правовых обязательств (например, ведение бухгалтерского
              учета и налоговой отчетности)
            </li>
            <li>
              защита законных интересов (например, предотвращение мошенничества
              и злоупотреблений)
            </li>
          </ul>
        </div>
        <div className="mt-10">
          {/* 4. Категории персональных данных */}
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            4. Категории персональных данных
          </h2>
          <ul className="mt-6 list-disc list-inside space-y-2 text-gray-700">
            <li>ФИО</li>
            <li>контактная информация (телефон, e-mail)</li>
            <li>адрес (при необходимости для оказания услуг)</li>
            <li>IP-адрес, данные браузера и файлы cookie</li>
          </ul>

          {/* 5. Правовые основания обработки */}
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            5. Правовые основания обработки
          </h2>
          <ul className="mt-6 list-disc list-inside space-y-2 text-gray-700">
            <li>ст. 6(1)(a) GDPR — согласие субъекта данных</li>
            <li>
              ст. 6(1)(b) GDPR — исполнение договора или заключение договора по
              запросу субъекта
            </li>
            <li>ст. 6(1)(c) GDPR — выполнение правовых обязательств</li>
            <li>
              ст. 6(1)(f) GDPR — законные интересы Оператора (например,
              администрирование сайта, защита от мошенничества)
            </li>
          </ul>

          {/* 6. Хранение данных */}
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            6. Хранение данных
          </h2>
          <p className="mt-6 text-gray-700">
            Персональные данные хранятся до момента оказания услуги и
            последующего напоминания, но не дольше 12 месяцев, если вы не
            отзовёте своё согласие ранее.
          </p>

          {/* 7. Передача данных третьим лицам */}
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            7. Передача данных третьим лицам
          </h2>
          <p className="mt-6 text-gray-700">
            Ваши данные не передаются третьим лицам, кроме случаев,
            предусмотренных законом или необходимых для оказания услуг
            (например, почтовые сервисы для рассылки напоминаний).
          </p>

          {/* 8. Права субъектов данных */}
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            8. Права субъектов данных (в соответствии с GDPR)
          </h2>
          <ul className="mt-6 list-disc list-inside space-y-2 text-gray-700">
            <li>право на доступ к своим данным (ст. 15 GDPR)</li>
            <li>право на исправление (ст. 16 GDPR)</li>
            <li>право на удаление («право быть забытым») (ст. 17 GDPR)</li>
            <li>право на ограничение обработки (ст. 18 GDPR)</li>
            <li>право на переносимость данных (ст. 20 GDPR)</li>
            <li>право возразить против обработки (ст. 21 GDPR)</li>
            <li>
              право подать жалобу в надзорный орган (в Эстонии — Data Protection
              Inspectorate / Andmekaitse Inspektsioon)
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Для реализации своих прав вы можете обратиться по адресу электронной
            почты:{" "}
            <a
              href="mailto:hulishevskyi@gmail.com"
              className="text-gray-900 hover:underline font-semibold "
            >
              hulishevskyi@gmail.com
            </a>
          </p>

          {/* 9. Трансграничная передача данных */}
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            9. Трансграничная передача данных
          </h2>
          <ul className="mt-6 list-disc list-inside space-y-2 text-gray-700">
            <li>
              страна признана Европейской комиссией обеспечивающей адекватный
              уровень защиты, или
            </li>
            <li>
              получатель данных предоставляет достаточные гарантии в
              соответствии с GDPR (например, стандартные договорные положения)
            </li>
          </ul>

          {/* 10. Безопасность данных */}
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            10. Безопасность данных
          </h2>
          <p className="mt-6 text-gray-700">
            Мы принимаем организационные и технические меры для защиты
            персональных данных от несанкционированного доступа, изменения,
            раскрытия или уничтожения.
          </p>

          {/* 11. Обновления политики */}
          <h2 className="mt-10 text-pretty text-md lg:text-3xl  font-semibold tracking-tight text-gray-900 uppercase font-sans">
            11. Обновления политики
          </h2>
          <p className="mt-6 text-gray-700">
            Мы можем периодически обновлять данную Политику. Последняя версия
            всегда доступна по адресу:{" "}
            <a
              href="https://thismywebsite.com/privacy"
              className="text-gray-900 font-semibold hover:underline"
            >
              https://thismywebsite.com/privacy
            </a>
          </p>
        </div>
        <div className="mt-20">
          <a
            href="/"
            className="block w-full rounded-md bg-gray-800 px-3.5 py-3 text-center text-lg font-semibold text-white hover:bg-[#a1a49f] focus-visible:outline-gray-800 uppercase"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}
