// --- File: PrivacyPolicy.jsx ---
export const PrivacyPolicy = ({
  siteName = "[Your Website Name]",
  effectiveDate = "[Effective Date]",
  companyName = "[Your Company/Brand]",
  contactEmail = "[contact@email.com]",
  dpoEmail = "[dpo@email.com]",
  companyAddress = "[Company Address, City, Country]",
}) => {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <section className="bg-base-200 backdrop-blur rounded-2xl shadow p-6 sm:p-10">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-600">Effective Date: {effectiveDate}</p>
        </header>

        <p className="text-gray-700 leading-relaxed">
          {companyName} ("we", "us", or "our") operates {siteName}. This Privacy Policy explains what information we collect,
          how we use it, and your choices. By using the site, you agree to this Policy.
        </p>

        <h2 className="mt-8 text-xl font-semibold">1. Information We Collect</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
          <li><span className="font-medium">Account & Booking Data:</span> name, email, phone, address, passport or ID (where required), travel preferences.</li>
          <li><span className="font-medium">Payment Data:</span> processed by third-party gateways; we receive limited transaction details (no full card storage).</li>
          <li><span className="font-medium">Technical Data:</span> IP, device, browser, cookies, analytics usage data.</li>
          <li><span className="font-medium">User Content:</span> reviews, messages, support inquiries.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">2. How We Use Information</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
          <li>Provide, confirm, and manage bookings and customer support.</li>
          <li>Send service notices and, with your consent where required, marketing communications.</li>
          <li>Improve site performance, safety, and user experience.</li>
          <li>Comply with legal obligations and prevent fraud.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">3. Legal Bases (if applicable)</h2>
        <p className="text-gray-700 mt-2">
          Depending on your location, processing may rely on consent, contract performance, legal obligations, and legitimate
          interests (e.g., improving Services, ensuring security).
        </p>

        <h2 className="mt-6 text-xl font-semibold">4. Sharing & Disclosures</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
          <li>With travel partners (guides, hotels, transport) to fulfill bookings.</li>
          <li>With payment processors and IT vendors (subject to contracts and safeguards).</li>
          <li>With authorities if required by law or to protect rights and safety.</li>
          <li>In a business transfer (merger, acquisition) with notice where required.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">5. International Transfers</h2>
        <p className="text-gray-700 mt-2">
          Your data may be transferred to and processed in countries other than your own. We use appropriate safeguards (e.g.,
          contractual clauses) where required by law.
        </p>

        <h2 className="mt-6 text-xl font-semibold">6. Data Retention</h2>
        <p className="text-gray-700 mt-2">
          We retain personal data only as long as necessary for the purposes stated above and to meet legal, accounting, or
          reporting requirements.
        </p>

        <h2 className="mt-6 text-xl font-semibold">7. Your Rights</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
          <li>Access, correction, deletion, and portability of your data.</li>
          <li>Object to or restrict certain processing; withdraw consent at any time (does not affect prior processing).</li>
          <li>Opt out of marketing emails via the unsubscribe link.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">8. Security</h2>
        <p className="text-gray-700 mt-2">
          We implement technical and organizational measures (encryption in transit, access controls). No method is 100% secure,
          and we cannot guarantee absolute security.
        </p>

        <h2 className="mt-6 text-xl font-semibold">9. Children</h2>
        <p className="text-gray-700 mt-2">
          Our Services are not directed to children under 13 (or the applicable age of consent). We do not knowingly collect
          their data. If you believe a child provided data, contact us to delete it.
        </p>

        <h2 className="mt-6 text-xl font-semibold">10. Changes to This Policy</h2>
        <p className="text-gray-700 mt-2">
          We may update this Privacy Policy from time to time. Material changes will be indicated by updating the Effective Date
          and providing additional notice where required.
        </p>

        <h2 className="mt-6 text-xl font-semibold">11. Contact</h2>
        <p className="text-gray-700 mt-2">
          For questions or privacy requests, email <a className="text-blue-600 underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>
          {dpoEmail !== "" ? (
            <> or our Data Protection contact at <a className="text-blue-600 underline" href={`mailto:${dpoEmail}`}>{dpoEmail}</a></>
          ) : null}
          . You can also write to {companyAddress}.
        </p>
      </section>
    </main>
  );
};

// --- File: CookiePolicy.jsx ---