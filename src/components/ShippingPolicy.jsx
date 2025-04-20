import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Shipping and Delivery Policy</h1>
      <p className="mb-4">
        DevMatch is a digital-only platform, and we do not ship any physical goods. All services provided by DevMatch are available online and accessible immediately upon successful registration and login.
      </p>

      <h2 className="text-xl font-semibold mb-2">Service Availability</h2>
      <p className="mb-4">
        Upon account creation and authentication, users can instantly access all features of the DevMatch platform, including:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>User profile management</li>
        <li>Connecting and messaging with other users</li>
        <li>Viewing requests and connections</li>
        <li>Exploring new matches on the feed</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">No Physical Shipping</h2>
      <p className="mb-4">
        As DevMatch operates entirely online, there are no delivery charges or shipping timelines involved.
      </p>

      <h2 className="text-xl font-semibold mb-2">Support</h2>
      <p className="mb-4">
        If you experience any delay or issue accessing the platform after login, please reach out to our support team at{" "}
        <a href="mailto:support@devmatch.in" className="text-blue-600 underline">
          support@devmatch.in
        </a>.
      </p>

      <p>
        Thank you for choosing DevMatch. We’re here to make meaningful connections seamless and instant.
      </p>
    </div>
  );
};

export default ShippingPolicy;
