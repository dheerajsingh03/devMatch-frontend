export default function TermsAndConditions() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">Welcome to DevMatch! By using our platform, you agree to the following terms:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>You will use the platform lawfully and respectfully.</li>
        <li>You are responsible for the accuracy of information you provide.</li>
        <li>We may update or modify services at any time.</li>
      </ul>
      <p className="mb-4">
        DevMatch is provided "as is" and we are not liable for any indirect damages resulting from your use of the platform.
      </p>
      <p>
        For questions, reach out to <a className="text-blue-600" href="mailto:support@devmatch.in">support@devmatch.in</a>.
      </p>
    </div>
  );
}
