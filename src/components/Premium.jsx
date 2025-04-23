import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { CheckCircle, Gift, Settings } from "lucide-react";

export default function Premium() {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/premium/verify`, {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
        setExpiresAt(res.data.expiresAt); 
      }
    } catch (err) {
      console.error("Premium check failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevMatch",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} Membership`,
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
          contact: notes.phone || "",
        },
        theme: { color: "#4F46E5" }, // match your brand
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Checking subscription...</div>;
  }

  if (isUserPremium) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
        <CheckCircle className="mx-auto mb-4 w-16 h-16 text-green-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          You’re a Premium Member!
        </h1>
        {expiresAt && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Your subscription is active until{' '}
            <span className="font-medium">{new Date(expiresAt).toLocaleDateString()}</span>
          </p>
        )}

        <ul className="mt-6 space-y-3 text-left">
          <li className="flex items-center">
            <Gift className="w-5 h-5 text-yellow-400" />
            <span className="ml-2">Unlimited connection requests</span>
          </li>
          <li className="flex items-center">
            <Gift className="w-5 h-5 text-yellow-400" />
            <span className="ml-2">Blue Tick Verified</span>
          </li>
          <li className="flex items-center">
            <Gift className="w-5 h-5 text-yellow-400" />
            <span className="ml-2">Membership benefits unlocked</span>
          </li>
        </ul>

        <button
          onClick={() => {/* navigate to manage page */}}
          className="mt-8 flex items-center justify-center w-full py-2 font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          <Settings className="w-5 h-5 mr-2" />
          Manage Subscription
        </button>
      </div>
    );
  }

  return (
    <div className="m-10 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Silver Card */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl flex-1 p-6">
          <h2 className="font-bold text-3xl mb-4">Silver Membership</h2>
          <ul className="space-y-2 mb-6 text-gray-800 dark:text-gray-200">
            <li>Chat with other people</li>
            <li>100 connection requests per day</li>
            <li>Blue Tick</li>
            <li>3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="w-full py-2 font-semibold rounded-lg bg-pink-500 hover:bg-pink-400 text-white"
          >
            Buy Silver
          </button>
        </div>
        {/* Gold Card */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl flex-1 p-6">
          <h2 className="font-bold text-3xl mb-4">Gold Membership</h2>
          <ul className="space-y-2 mb-6 text-gray-800 dark:text-gray-200">
            <li>Chat with other people</li>
            <li>Infinite connection requests per day</li>
            <li>Blue Tick</li>
            <li>6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="w-full py-2 font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
}
