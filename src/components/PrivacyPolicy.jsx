export default function PrivacyPolicy() {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At DevMatch, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information.
        </p>
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Name, email address, and contact details during sign-up</li>
          <li>Usage data for app performance and feature improvements</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>To provide social connection features</li>
          <li>To improve our platform and personalize your experience</li>
          <li>To send important service updates</li>
        </ul>
        <p className="mb-4">
          We implement security measures to protect your data and may use third-party tools such as analytics or payment gateways under their own privacy policies.
        </p>
        <p>
          For any concerns, contact us at <a className="text-blue-600" href="mailto:support@devmatch.in">support@devmatch.in</a>.
        </p>
      </div>
    );
  }
  