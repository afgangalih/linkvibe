"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is LinkVibe free to use?",
    answer: "Yes, LinkVibe offers a generous free tier that includes unlimited links, basic analytics, and our core templates. We also plan to offer premium features for power users in the future.",
  },
  {
    question: "Can I customize the colors and fonts?",
    answer: "Absolutely. With our Template Engine, you can instantly switch between distinct visual themes like Minimalist, Glassmorphism, and Neon. We are also working on a granular customizer.",
  },
  {
    question: "How many links can I add to my profile?",
    answer: "There are no limits on the number of links you can add. Organize them as you see fit to create the perfect landing page for your audience.",
  },
  {
    question: "Does it support image thumbnails for links?",
    answer: "Yes! You can upload custom thumbnails for each link to make them stand out. This is perfect for showcasing products, videos, or portfolio items.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-black border-t border-zinc-900">
      <div className="container px-4 mx-auto max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400">
            Everything you need to know about LinkVibe.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800">
              <AccordionTrigger className="text-white hover:text-blue-500 hover:no-underline transition-colors text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
