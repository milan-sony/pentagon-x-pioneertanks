"use client";

import { useId, useState, type FormEvent } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ENQUIRY_EMAIL } from "@/lib/constants";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid e-mail address."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a phone number.")
    .regex(/^[+\d\s()-]{6,20}$/, "Phone numbers may only contain digits, spaces, +, ( ) and -."),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  product: z.string().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little about your requirement (10 characters or more)."),
});

type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;

export interface EnquiryFormProps {
  /** Product options for the optional "Product of interest" select. */
  productOptions?: { value: string; label: string }[];
  /** Pre-selected product. */
  defaultProduct?: string;
  /** Class names supplied by each design branch. */
  classNames?: {
    form?: string;
    label?: string;
    input?: string;
    error?: string;
    button?: string;
    success?: string;
    help?: string;
  };
  heading?: string;
  description?: string;
}

/**
 * Validated enquiry form. There is no backend in this phase, so a valid submission
 * opens the visitor's e-mail client with a pre-filled message to the published
 * company address and shows a success state. Mirrors the fields of the live
 * site's Contact Form 7 form (Name, E-mail, Phone, Subject, Message) plus a
 * product selector.
 */
export function EnquiryForm({ productOptions = [], defaultProduct = "", classNames = {}, heading, description }: EnquiryFormProps) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const firstKey = Object.keys(next)[0];
      (form.querySelector(`[name="${firstKey}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    const v = result.data;
    const subject = v.subject || `Enquiry${v.product ? ` – ${v.product}` : ""} from ${v.name}`;
    const body = [
      `Name: ${v.name}`,
      `E-mail: ${v.email}`,
      `Phone: ${v.phone}`,
      v.product ? `Product of interest: ${v.product}` : null,
      "",
      v.message,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  const field = (name: keyof Fields) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className={cn("grid gap-5", classNames.form)} data-testid="enquiry-form" aria-labelledby={heading ? `${id}-heading` : undefined}>
      {heading ? (
        <h3 id={`${id}-heading`} className="sr-only">
          {heading}
        </h3>
      ) : null}
      {description ? <p className={classNames.help}>{description}</p> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name} errorId={`${id}-name-error`} labelClass={classNames.label} errorClass={classNames.error}>
          <input {...field("name")} type="text" autoComplete="name" required className={classNames.input} />
        </Field>
        <Field label="E-mail" required error={errors.email} errorId={`${id}-email-error`} labelClass={classNames.label} errorClass={classNames.error}>
          <input {...field("email")} type="email" autoComplete="email" required className={classNames.input} />
        </Field>
        <Field label="Phone number" required error={errors.phone} errorId={`${id}-phone-error`} labelClass={classNames.label} errorClass={classNames.error}>
          <input {...field("phone")} type="tel" autoComplete="tel" required className={classNames.input} />
        </Field>
        {productOptions.length ? (
          <Field label="Product of interest" error={errors.product} errorId={`${id}-product-error`} labelClass={classNames.label} errorClass={classNames.error}>
            <select {...field("product")} defaultValue={defaultProduct} className={classNames.input}>
              <option value="">Not sure yet</option>
              {productOptions.map((o) => (
                <option key={o.value} value={o.label}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <Field label="Subject" error={errors.subject} errorId={`${id}-subject-error`} labelClass={classNames.label} errorClass={classNames.error}>
            <input {...field("subject")} type="text" className={classNames.input} />
          </Field>
        )}
      </div>
      <Field label="Message" required error={errors.message} errorId={`${id}-message-error`} labelClass={classNames.label} errorClass={classNames.error}>
        <textarea {...field("message")} rows={5} required className={classNames.input} />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className={cn("inline-flex min-h-12 items-center justify-center px-6 font-semibold", classNames.button)}>
          Send enquiry
        </button>
        <p className={cn("text-sm", classNames.help)}>
          Sends via your e-mail app to <a href={`mailto:${ENQUIRY_EMAIL}`} className="underline underline-offset-4">{ENQUIRY_EMAIL}</a>.
        </p>
      </div>

      <p role="status" aria-live="polite" className={cn(status === "sent" ? "block" : "sr-only", classNames.success)} data-testid="enquiry-status">
        {status === "sent" ? "Thank you. Your e-mail app should now be open with your enquiry – press send to deliver it. You can also call us or use WhatsApp." : ""}
      </p>
    </form>
  );
}

function Field({ label, required, error, errorId, children, labelClass, errorClass }: { label: string; required?: boolean; error?: string; errorId: string; children: React.ReactNode; labelClass?: string; errorClass?: string }) {
  // The child input carries the id; derive label `htmlFor` from it.
  const child = children as React.ReactElement<{ id: string }>;
  return (
    <div className="grid gap-2">
      <label htmlFor={child.props.id} className={cn("text-sm font-medium", labelClass)}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className={cn("text-sm", errorClass)} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
