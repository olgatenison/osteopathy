import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Структурная остеопатия",
    answer:
      "это раздел остеопатии, который фокусируется на диагностике и лечении нарушений в опорно-двигательной системе, включая кости, мышцы, связки и суставы. Она направлена на восстановление нормальной структуры и функции этих элементов для облегчения боли, улучшения подвижности и общего состояния организма. ",
  },
  {
    question: "Висцеральная остеопатия",
    answer:
      "это направление в остеопатии, которое фокусируется на работе с внутренними органами и их связями в теле. Оно направлено на восстановление естественной подвижности и функции органов, а также на устранение функциональных нарушений и боли, связанных с органами брюшной полости, грудной клетки и таза. ",
  },
  {
    question: "Психосоматическая остеопатия",
    answer:
      "это подход, который рассматривает взаимосвязь между психическими процессами и физическим состоянием, используя остеопатические методы для лечения психосоматических расстройств. Остеопатия, в свою очередь, является методом немедикаментозного лечения, направленным на восстановление баланса в организме через мануальное воздействие на ткани и структуры. ",
  },
  {
    question: "Мануально-мышечное тестирование",
    answer:
      "метод оценки функционального состояния мышц, основанный на оценке их способности сокращаться в ответ на внешнее сопротивление. Специалист создает сопротивление, а пациент должен его преодолеть, что позволяет оценить силу и функцию мышцы. ММТ используется для диагностики мышечных дисфункций, оценки эффективности лечения и реабилитации, а также для подбора индивидуальных упражнений. ",
  },
];

export default function Methods() {
  return (
    <section>
      <div className="mx-auto max-w-6xl pb-10 px-6 md:px-8">
        <div className="mr-0 w-full md:max-w-xl">
          <div className="mt-8 divide-y divide-gray-900/20 font-sans">
            {faqs.map((faq) => (
              <Disclosure
                key={faq.question}
                as="div"
                className="py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base/7 font-semibold uppercase ">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-data-[open]:hidden"
                      />
                      <MinusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-[&:not([data-open])]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </div>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-lg/snug font-regular text-gray-600  max-w-md">
                    {faq.answer}
                  </p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </div>
        </div>

        {/* Картинка снизу, по правому краю */}
        <div className="mt-10 flex lg:justify-end">
          <div
            className="bg-cover bg-center h-[300px] w-[300px] hidden md:block"
            style={{ backgroundImage: "url('/bg-6.jpg')" }}
          ></div>
          <div
            className="bg-cover bg-center h-[300px] w-full md:w-[600px] md:mt-[300px]"
            style={{ backgroundImage: "url('/bg-8.jpg')" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
