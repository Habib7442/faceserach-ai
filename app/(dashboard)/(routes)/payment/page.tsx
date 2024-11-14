"use client"
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Load Stripe outside of a component to avoid recreating it on re-renders
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post('/api/checkout-session');
      const stripe = await stripePromise;

      // Redirect to Stripe Checkout
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to redirect to Stripe Checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Complete Your Payment</h1>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`px-6 py-3 bg-blue-600 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
      >
        {loading ? 'Processing...' : 'Go to Payment'}
      </button>
    </div>
  );
};

export default PaymentPage;
