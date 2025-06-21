import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Структурная ",
    answer:
      "работа с позвоночником, мышцами и суставами для восстановления подвижности и осанки.",
  },
  {
    question: "Висцеральная",
    answer:
      "мягкое воздействие на внутренние органы и связочный аппарат, улучшение их функции.",
  },
  {
    question: "Психосоматическая",
    answer:
      "понимание того, как эмоции и стресс отражаются на теле, работа с этими проявлениями.",
  },
];

export default function Methods() {
  return (
    <div className="">
      <div className="mx-auto max-w-6xl pb-10 ">
        <div className="mr-0 max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 uppercase font-sans">
            Виды остеопатии, которые я практикую:
          </h2>
          <div className="mt-8 divide-y divide-gray-900/10 font-sans">
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
          {/* Картинка снизу, по правому краю */}
          <div className="mt-10 flex justify-end">
            <div
              className="bg-cover bg-center h-[300px] w-[300px]"
              style={{ backgroundImage: "url('/bg-6.jpg')" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
