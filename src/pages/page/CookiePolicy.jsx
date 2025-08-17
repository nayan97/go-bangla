// --- File: CookiePolicy.jsx ---
export const CookiePolicy = ({
  siteName = "[Your Website Name]",
  effectiveDate = "[Effective Date]",
}) => {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <section className="bg-base-200 backdrop-blur rounded-2xl shadow p-6 sm:p-10">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="mt-2 text-sm">Effective Date: {effectiveDate}</p>
        </header>

        <p className=" leading-relaxed">
          This Cookie Policy explains how {siteName} uses cookies and similar technologies to recognize you when you visit our
          website, what they are, why we use them, and how you can control them.
        </p>

        <h2 className="mt-8 text-xl font-semibold">1. What Are Cookies?</h2>
        <p className=" mt-2">
          Cookies are small text files placed on your device. They are widely used to make websites work, or work more
          efficiently, and to provide reporting information.
        </p>

        <h2 className="mt-6 text-xl font-semibold">2. Types of Cookies We Use</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 ">
          <li><span className="font-medium">Strictly Necessary:</span> required for core functionality (e.g., secure login, booking flow).</li>
          <li><span className="font-medium">Performance/Analytics:</span> help us understand how visitors use the site (e.g., page views, time on page).</li>
          <li><span className="font-medium">Functionality:</span> remember preferences like language, currency, and recent searches.</li>
          <li><span className="font-medium">Advertising/Targeting:</span> used to deliver relevant ads and measure their effectiveness.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">3. Cookies We May Set</h2>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full text-left text-sm  border rounded-xl overflow-hidden">
            <thead className="bg-base-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Type</th>
                <th className="p-3">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">session_id</td>
                <td className="p-3">Maintain session and security</td>
                <td className="p-3">Strictly necessary</td>
                <td className="p-3">Session</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">analytics_*</td>
                <td className="p-3">Site usage analytics and performance</td>
                <td className="p-3">Performance</td>
                <td className="p-3">Up to 24 months</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">pref_currency</td>
                <td className="p-3">Save currency preference</td>
                <td className="p-3">Functionality</td>
                <td className="p-3">6-12 months</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">ad_consent</td>
                <td className="p-3">Store your marketing consent choices</td>
                <td className="p-3">Targeting</td>
                <td className="p-3">6-12 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-6 text-xl font-semibold">4. Managing Cookies</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 ">
          <li>Most browsers let you refuse or delete cookies via settings. See your browser’s Help for details.</li>
          <li>You can opt out of certain analytics/advertising cookies via their own opt-out tools where available.</li>
          <li>Disabling some cookies may impact site functionality and booking flow.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">5. Changes to This Policy</h2>
        <p className=" mt-2">We may update this Cookie Policy from time to time. Please review it periodically.</p>

        <h2 className="mt-6 text-xl font-semibold">6. Contact</h2>
        <p className=" mt-2">
          Questions about cookies? Contact us at <a className="text-blue-600 underline" href="mailto:[contact@email.com]">[contact@email.com]</a>.
        </p>
      </section>
    </main>
  );
};

// --- Optional: Example Wrapper Page to switch between policies ---