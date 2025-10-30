import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "./ui/typography";

const faqs = [
  {
    question: "Very long question name?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Blandit hoc semper cras at tellus aliquam sit. Massa justo nullam ut auctor integer id praesent tacuils. Quis euismod vitae consequat sed erat. Ut in sed facilisis cras. Venenatis risus vestibulum gravida lectus eget. Id porta diam vestibulum porta non fringilla quis vel.",
  },
  {
    question: "Very long question name?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Blandit hoc semper cras at tellus aliquam sit. Massa justo nullam ut auctor integer id praesent tacuils. Quis euismod vitae consequat sed erat. Ut in sed facilisis cras. Venenatis risus vestibulum gravida lectus eget. Id porta diam vestibulum porta non fringilla quis vel.",
  },
  {
    question: "Very long question name?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Blandit hoc semper cras at tellus aliquam sit. Massa justo nullam ut auctor integer id praesent tacuils. Quis euismod vitae consequat sed erat. Ut in sed facilisis cras. Venenatis risus vestibulum gravida lectus eget. Id porta diam vestibulum porta non fringilla quis vel.",
  },
  {
    question: "Very long question name?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Blandit hoc semper cras at tellus aliquam sit. Massa justo nullam ut auctor integer id praesent tacuils. Quis euismod vitae consequat sed erat. Ut in sed facilisis cras. Venenatis risus vestibulum gravida lectus eget. Id porta diam vestibulum porta non fringilla quis vel.",
  },
];

export function FAQ() {
  return (
    <section>
      <Typography as="h2" variant="h2" className="mb-6">
        FAQ
      </Typography>

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
