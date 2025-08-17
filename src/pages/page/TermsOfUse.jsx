export const TermsOfUse = ({
  siteName = "[Your Website Name]",
  effectiveDate = "[Effective Date]",
  companyName = "[Your Company/Brand]",
  contactEmail = "[contact@email.com]",
  companyAddress = "[Company Address, City, Country]",
  supportPhone = "[Support Phone]",
}) => {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <section className="bg-base-200 backdrop-blur rounded-2xl shadow p-6 sm:p-10">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Terms of Use</h1>
          <p className="mt-2 text-sm">Effective Date: {effectiveDate}</p>
        </header>

        <p className="leading-relaxed">
          Welcome to {siteName}! By accessing or using this website, you agree to be bound by these Terms of Use. If you do not
          agree, please do not use our services.
        </p>

        <h2 className="mt-8 text-xl font-semibold">1. Services</h2>
        <p className="mt-2">
          We provide travel-related information and booking facilitation for tours, accommodations, and transportation (the
          "Services"). All bookings are subject to availability and confirmation by the relevant provider.
        </p>

        <h2 className="mt-6 text-xl font-semibold">2. Eligibility & Account</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 ">
          <li>You must be at least 18 years old (or the age of majority in your jurisdiction) to create an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</li>
          <li>Provide accurate, current, and complete information at all times.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">3. Bookings, Payments & Cancellations</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 ">
          <li>Payments are processed via secure third-party payment gateways. {companyName} does not store full card data.</li>
          <li>Each product/service lists its own cancellation and refund rules. Please review before confirming.</li>
          <li>Currency conversions and bank fees are your responsibility where applicable.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">4. User Conduct</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 ">
          <li>No unlawful, harmful, fraudulent, infringing, or disruptive activities.</li>
          <li>No attempts to scrape, reverse engineer, or overload our systems.</li>
          <li>Reviews and content must be accurate, respectful, and non-defamatory.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">5. Intellectual Property</h2>
        <p className="mt-2">
          All content on the site (text, images, logos, UI) is owned by {companyName} or its licensors and protected by
          applicable IP laws. You may not copy, reproduce, or distribute without prior written consent.
        </p>

        <h2 className="mt-6 text-xl font-semibold">6. Third-Party Services</h2>
        <p className="mt-2">
          Our Services may link to or rely on third parties (e.g., hotels, transport, payment processors). We are not responsible
          for third-party content, terms, or actions.
        </p>

        <h2 className="mt-6 text-xl font-semibold">7. Disclaimers</h2>
        <p className="mt-2">
          The Services are provided on an "as is" and "as available" basis. Travel involves risks; schedules and availability can
          change. We do not guarantee uninterrupted or error-free operation.
        </p>

        <h2 className="mt-6 text-xl font-semibold">8. Limitation of Liability</h2>
        <p className="mt-2">
          To the maximum extent permitted by law, {companyName} will not be liable for indirect, incidental, special,
          consequential, or punitive damages, or any loss of profits, data, or goodwill arising from your use of the Services.
        </p>

        <h2 className="mt-6 text-xl font-semibold">9. Indemnification</h2>
        <p className="mt-2">
          You agree to indemnify and hold {companyName}, its affiliates, and personnel harmless from any claims or demands arising
          out of your use of the Services or your violation of these Terms.
        </p>

        <h2 className="mt-6 text-xl font-semibold">10. Changes to Terms</h2>
        <p className="mt-2">
          We may update these Terms from time to time. The updated version will be effective upon posting on this page, unless a
          later date is specified.
        </p>

        <h2 className="mt-6 text-xl font-semibold">11. Governing Law & Dispute Resolution</h2>
        <p className="mt-2">
          These Terms are governed by the laws of [Jurisdiction/Country]. Disputes will be resolved through good-faith
          negotiations; if unresolved, they shall be submitted to the exclusive jurisdiction of the courts located in
          [Jurisdiction/City].
        </p>

        <h2 className="mt-6 text-xl font-semibold">12. Contact</h2>
        <p className="mt-2">
          Questions? Contact us at <a className="text-blue-600 underline" href={`mailto:${contactEmail}`}>{contactEmail}</a> or
          write to {companyAddress}. Support: {supportPhone}
        </p>
      </section>
    </main>
  );
};

// --- File: PrivacyPolicy.jsx ---