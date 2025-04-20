import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Shipping and Delivery Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last updated: April 20, 2025</p>

      <p className="mb-4">
        At <strong>DevMatch</strong>, we provide digital-only services. There is no physical shipping involved.
        However, in compliance with Razorpay's onboarding requirements, we have outlined our delivery practices for transparency.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🚚 Delivery Method</h2>
      <p className="mb-4">
        All services offered on DevMatch are delivered <strong>digitally</strong> through our platform.
        Users can access all features and services by logging into their account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🕒 Delivery Timeline</h2>
      <p className="mb-4">
        Once registered and logged in, users will gain <strong>instant access</strong> to all digital features.
        No waiting period is involved.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">📍 Service Availability</h2>
      <p className="mb-4">
        Our services are available across <strong>India and globally</strong>, as long as the user has an active internet connection.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">📦 Shipping of Physical Items</h2>
      <p className="mb-4">
        At present, <strong>DevMatch does not sell or ship any physical products</strong>. Hence, no physical delivery is applicable.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">❓ Issues with Access</h2>
      <p>
        If you experience any issues accessing digital services, please contact us at{" "}
        <a href="mailto:support@devmatch.com" className="text-blue-500 underline">
          support@devmatch.com
        </a>. We usually respond within <strong>24–48 hours</strong>.
      </p>
    </div>
  );
};

export default ShippingPolicy;
