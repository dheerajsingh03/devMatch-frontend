export default function ContactUs() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        If you have any questions, feedback, or need support, feel free to reach out to us:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Email: <a className="text-blue-600" href="mailto:support@devmatch.in">support@devmatch.in</a></li>
        <li>Website: <a className="text-blue-600" href="https://devmatch.in" target="_blank" rel="noreferrer">https://devmatch.in</a></li>
      </ul>
    </div>
  );
}
