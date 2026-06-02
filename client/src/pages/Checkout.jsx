import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useCartStore from "../store/cartStore";
import { createOrder } from "../services/orderService";

const RAZORPAY_KEY_ID = "rzp_test_SwrMgn9AjXOWgN";

function Checkout() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);

  const [delivery, setDelivery] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Kolkata",
  });

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const deliveryCharge = total > 5000 ? 0 : 199;
  const gst = Math.round(total * 0.18);
  const finalTotal = total + gst + deliveryCharge;

  const paymentMethods = [
    {
      id: "cod",
      title: "Cash On Delivery",
      icon: "💵",
      desc: "Pay after delivery",
      badge: "COD",
    },
    {
      id: "upi",
      title: "UPI",
      icon: "📱",
      desc: "GPay, PhonePe, Paytm",
      badge: "Razorpay",
    },
    {
      id: "card",
      title: "Cards",
      icon: "💳",
      desc: "Credit, Debit, RuPay",
      badge: "Razorpay",
    },
    {
      id: "netbanking",
      title: "Net Banking",
      icon: "🏦",
      desc: "All major banks",
      badge: "Razorpay",
    },
    {
      id: "wallet",
      title: "Wallets",
      icon: "👛",
      desc: "Paytm and more",
      badge: "Razorpay",
    },
    {
      id: "emi",
      title: "EMI / Pay Later",
      icon: "⚡",
      desc: "Installments",
      badge: "Razorpay",
    },
  ];

  const getPaymentName = () => {
    return paymentMethods.find((m) => m.id === paymentMethod)?.title || "COD";
  };

  const handleChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const validateDelivery = () => {
    if (!delivery.name || !delivery.phone || !delivery.address || !delivery.city) {
      alert("Please fill all delivery details");
      return false;
    }

    if (delivery.phone.length < 10) {
      alert("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCODOrder = async () => {
    await createOrder({
      total: finalTotal,
      items: cart,
      delivery,
      payment_method: "Cash on Delivery",
      payment_status: "Pending",
      status: "Placed",
    });

    clearCart();
    navigate("/order-success");
  };

  const handleOnlinePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay failed to load. Please check your internet connection.");
      return;
    }

    const { data } = await axios.post(
      "http://localhost:5000/create-razorpay-order",
      {
        amount: finalTotal,
      }
    );

    const options = {
      key: RAZORPAY_KEY_ID ,
      amount: data.amount,
      currency: "INR",
      name: "ConstructCraft",
      description: `Payment via ${getPaymentName()}`,
      order_id: data.id,

      handler: async function (response) {
        await createOrder({
          total: finalTotal,
          items: cart,
          delivery,
          payment_method: getPaymentName(),
          payment_status: "Paid",
          status: "Placed",
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });

        clearCart();
        navigate("/order-success");
      },

      prefill: {
        name: delivery.name,
        contact: delivery.phone,
      },

      notes: {
        address: delivery.address,
        city: delivery.city,
        project: "ConstructCraft",
      },

      theme: {
        color: "#f97316",
      },

      modal: {
        ondismiss: function () {
          alert("Payment cancelled");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      console.log(response.error);
      alert(response.error.description || "Payment failed");
    });

    paymentObject.open();
  };

  const handleOrder = async () => {
    if (!validateDelivery()) return;

    try {
      setPlacingOrder(true);

      if (paymentMethod === "cod") {
        await handleCODOrder();
      } else {
        await handleOnlinePayment();
      }
    } catch (error) {
      console.log(error);
      alert("Payment or order failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 pt-28 px-6 pb-16 text-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-orange-300 font-bold">Secure Payment</p>

        <h1 className="text-5xl font-extrabold mt-2 mb-10">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white/10 p-12 rounded-[2rem] text-center">
            <h2 className="text-3xl font-bold">No items to checkout</h2>

            <Link
              to="/marketplace"
              className="inline-block mt-6 bg-orange-500 px-8 py-4 rounded-2xl font-bold"
            >
              Go To Materials
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white text-slate-900 p-7 rounded-[2rem] shadow-xl">
                <h2 className="text-2xl font-extrabold mb-5">
                  Delivery Details
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={delivery.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border p-4 rounded-xl"
                  />

                  <input
                    name="phone"
                    value={delivery.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border p-4 rounded-xl"
                  />
                </div>

                <textarea
                  name="address"
                  value={delivery.address}
                  onChange={handleChange}
                  placeholder="Delivery Address"
                  rows="4"
                  className="w-full border p-4 rounded-xl mt-4"
                />

                <input
                  name="city"
                  value={delivery.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border p-4 rounded-xl mt-4"
                />
              </div>

              <div className="bg-white text-slate-900 p-7 rounded-[2rem] shadow-xl">
                <h2 className="text-2xl font-extrabold mb-5">
                  Choose Payment
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-5 rounded-2xl border text-left transition ${
                        paymentMethod === method.id
                          ? "border-orange-500 bg-orange-50 shadow-lg"
                          : "border-slate-200 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <div className="text-4xl mb-3">
                            {method.icon}
                          </div>

                          <h3 className="font-extrabold">
                            {method.title}
                          </h3>

                          <p className="text-slate-500 text-sm">
                            {method.desc}
                          </p>
                        </div>

                        <span
                          className={`h-fit text-xs px-3 py-1 rounded-full font-bold ${
                            method.badge === "COD"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {method.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white text-slate-900 p-7 rounded-[2rem] shadow-xl h-fit sticky top-28">
              <h2 className="text-2xl font-extrabold mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-2 text-sm gap-4"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span className="font-bold">
                      ₹{(Number(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST 18%</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Payment</span>
                  <span>{getPaymentName()}</span>
                </div>
              </div>

              <div className="flex justify-between text-3xl font-extrabold border-t pt-5 mt-5">
                <span>Total</span>

                <span className="text-orange-500">
                  ₹{finalTotal.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleOrder}
                disabled={placingOrder}
                className="w-full mt-6 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {placingOrder
                  ? "Processing..."
                  : paymentMethod === "cod"
                  ? "Place COD Order"
                  : `Pay with ${getPaymentName()}`}
              </button>

              <p className="text-xs text-slate-400 text-center mt-4">
                UPI, cards, net banking and wallets open through Razorpay
                Checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;