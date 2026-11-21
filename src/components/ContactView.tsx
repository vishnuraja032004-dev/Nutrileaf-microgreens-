import { FormEvent, useState } from 'react';
import { CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  CONTACT_PHONES,
  MICROGREEN_PRODUCTS,
  SECONDARY_DISPLAY_PHONE,
  SECONDARY_WHATSAPP_NUMBER,
  WHATSAPP_NUMBER,
} from '../data/microgreens';
import {
  buildWhatsAppUrl,
  EnquiryFormInput,
  EnquiryValidationErrors,
  formatEnquiryWhatsAppMessage,
  validateEnquiryForm,
} from '../utils/catalog';

const CUSTOMER_TYPES = [
  'Family / Home Kitchen',
  'Gym / Fitness Center',
  'Restaurant / Cafe',
  'Hotel / Catering',
  'Supermarket / Organic Store',
];

const INITIAL_FORM: EnquiryFormInput = {
  name: '',
  phone: '',
  customerType: 'Family / Home Kitchen',
  selectedVarieties: [],
  message: '',
};

export function ContactView() {
  const [form, setForm] = useState<EnquiryFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<EnquiryValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] =
    useState<EnquiryFormInput | null>(null);

  const toggleVariety = (varietyName: string) => {
    setForm((prev) => {
      const exists = prev.selectedVarieties.includes(varietyName);
      return {
        ...prev,
        selectedVarieties: exists
          ? prev.selectedVarieties.filter((v) => v !== varietyName)
          : [...prev.selectedVarieties, varietyName],
      };
    });
    if (errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validateEnquiryForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmittedRecord(form);
  };

  const primaryWhatsApp = buildWhatsAppUrl(
    'Hello Nutrileaf Microgreens (Dindigul), I would like to enquire about fresh microgreens.',
    WHATSAPP_NUMBER
  );
  const secondaryWhatsApp = buildWhatsAppUrl(
    'Hello Nutrileaf Microgreens (Dindigul), I would like to enquire about fresh microgreens.',
    SECONDARY_WHATSAPP_NUMBER
  );

  return (
    <div>
      <section className="bg-forest-900 text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-wider text-leaf-300">
            Contact & Wholesale Enquiries
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-3">
            Talk directly with our Dindigul farm
          </h1>
          <p className="mt-4 text-cream-100/85 text-base sm:text-lg max-w-2xl mx-auto">
            Order weekly home punnets or schedule recurring restaurant and store
            trays directly with the grower.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-forest-800/10 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-forest-800">
                  Direct Farm Details
                </h2>
                <p className="mt-2 text-sm text-forest-600">
                  Morning harvest cuts run daily. Reach out for same-day local
                  availability or recurring HoReCa tray schedules.
                </p>
              </div>

              <div className="space-y-4 text-sm border-t border-forest-800/10 pt-5">
                <div className="flex items-start gap-3">
                  <Phone
                    className="w-4 h-4 text-leaf-700 mt-1 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="font-semibold text-forest-800">
                      Phone & WhatsApp
                    </p>
                    {CONTACT_PHONES.map((entry) => (
                      <div key={entry.raw}>
                        <a
                          href={`tel:+${entry.raw}`}
                          className="text-forest-600 hover:text-forest-800 tabular-nums"
                        >
                          {entry.display}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 text-leaf-700 mt-1 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-forest-800">
                      Growing Facility
                    </p>
                    <p className="text-forest-600">
                      Dindigul, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={primaryWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm py-3 px-5 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Chat on WhatsApp Now</span>
                </a>
                <a
                  href={secondaryWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 border border-forest-800/20 hover:bg-cream-100 text-forest-800 font-semibold text-sm py-2.5 px-5 rounded-lg transition-colors tabular-nums"
                >
                  <span>Alternate WhatsApp ({SECONDARY_DISPLAY_PHONE})</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submittedRecord ? (
              <div
                data-testid="enquiry-confirmation"
                className="bg-white rounded-2xl border border-forest-800/15 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 text-leaf-700">
                  <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                  <h2 className="font-heading text-2xl font-bold text-forest-800">
                    Enquiry ready for Nutrileaf
                  </h2>
                </div>
                <p className="mt-3 text-sm text-forest-600">
                  Thank you, <span className="font-semibold text-forest-800">{submittedRecord.name}</span>. Your
                  enquiry details are formatted below—send directly via WhatsApp
                  for fastest harvest confirmation.
                </p>

                <dl className="mt-6 grid sm:grid-cols-2 gap-4 bg-cream-50 rounded-xl border border-forest-800/10 p-5 text-sm">
                  <div>
                    <dt className="text-xs text-forest-600">Mobile</dt>
                    <dd className="font-semibold text-forest-800 tabular-nums mt-0.5">
                      {submittedRecord.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-forest-600">Category</dt>
                    <dd className="font-semibold text-forest-800 mt-0.5">
                      {submittedRecord.customerType}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-forest-600">
                      Selected Varieties
                    </dt>
                    <dd className="font-semibold text-forest-800 mt-0.5">
                      {submittedRecord.selectedVarieties.length > 0
                        ? submittedRecord.selectedVarieties.join(', ')
                        : 'General availability enquiry'}
                    </dd>
                  </div>
                  {submittedRecord.message.trim() && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-forest-600">Notes</dt>
                      <dd className="text-forest-700 mt-0.5">
                        {submittedRecord.message}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      formatEnquiryWhatsAppMessage(submittedRecord)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-leaf-500 hover:bg-leaf-400 text-forest-900 font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRecord(null);
                      setForm(INITIAL_FORM);
                    }}
                    className="border border-forest-800/20 hover:bg-cream-100 text-forest-800 font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl border border-forest-800/10 p-6 sm:p-8 space-y-5"
              >
                <h2 className="font-heading text-2xl font-bold text-forest-800">
                  Send an Order or Wholesale Enquiry
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-xs font-semibold text-forest-800 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Karthik Sundaram"
                      aria-invalid={Boolean(errors.name)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-cream-50/50 text-forest-800 ${
                        errors.name
                          ? 'border-red-600'
                          : 'border-forest-800/15 focus:border-leaf-600'
                      }`}
                    />
                    {errors.name && (
                      <p
                        role="alert"
                        className="mt-1 text-xs font-medium text-red-700"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-xs font-semibold text-forest-800 mb-1.5"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone)
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="10-digit mobile number"
                      aria-invalid={Boolean(errors.phone)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-cream-50/50 text-forest-800 tabular-nums ${
                        errors.phone
                          ? 'border-red-600'
                          : 'border-forest-800/15 focus:border-leaf-600'
                      }`}
                    />
                    {errors.phone && (
                      <p
                        role="alert"
                        className="mt-1 text-xs font-medium text-red-700"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-type"
                    className="block text-xs font-semibold text-forest-800 mb-1.5"
                  >
                    Customer Category
                  </label>
                  <select
                    id="enquiry-type"
                    value={form.customerType}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        customerType: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-forest-800/15 bg-cream-50/50 text-forest-800 focus:border-leaf-600"
                  >
                    {CUSTOMER_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="text-xs font-semibold text-forest-800 mb-2">
                    Varieties of Interest
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {MICROGREEN_PRODUCTS.map((product) => {
                      const checked = form.selectedVarieties.includes(
                        product.name
                      );
                      return (
                        <label
                          key={product.id}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                            checked
                              ? 'bg-forest-50 border-forest-800 text-forest-900'
                              : 'bg-cream-50/40 border-forest-800/15 text-forest-700 hover:border-forest-800/35'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleVariety(product.name)}
                            className="accent-forest-800 rounded"
                          />
                          <span className="truncate">{product.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block text-xs font-semibold text-forest-800 mb-1.5"
                  >
                    Quantity & Delivery Schedule Notes
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message)
                        setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Share pack sizes, weekly frequency, or Dindigul delivery area..."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-cream-50/50 text-forest-800 ${
                      errors.message
                        ? 'border-red-600'
                        : 'border-forest-800/15 focus:border-leaf-600'
                    }`}
                  />
                  {errors.message && (
                    <p
                      role="alert"
                      className="mt-1 text-xs font-medium text-red-700"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-leaf-500 hover:bg-leaf-400 text-forest-900 font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Prepare Enquiry Summary
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
