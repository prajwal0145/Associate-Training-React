import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, calculateTotal } from "../redux/features/cart/cartSlice";
import { orderApi } from "../api/orderApi";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    paymentMethod: "card", // card, upi, cod
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }

    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    dispatch(calculateTotal());
  }, [user, items, navigate, dispatch]);

  const shippingCost = total >= 2000 ? 0 : 100;
  const tax = Math.round(total * 0.18);
  const finalTotal = total + shippingCost + tax;

  const handleShippingChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });

    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateShipping = () => {
    const newErrors = {};

    if (!shippingData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!shippingData.email.trim()) newErrors.email = "Email is required";
    if (!shippingData.phone.trim())
      newErrors.phone = "Phone number is required";
    if (!shippingData.address.trim()) newErrors.address = "Address is required";
    if (!shippingData.city.trim()) newErrors.city = "City is required";
    if (!shippingData.state.trim()) newErrors.state = "State is required";
    if (!shippingData.pincode.trim()) newErrors.pincode = "Pincode is required";

    if (
      shippingData.phone &&
      !/^\d{10}$/.test(shippingData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (shippingData.pincode && !/^\d{6}$/.test(shippingData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    if (paymentData.paymentMethod === "cod") return true;

    const newErrors = {};

    if (paymentData.paymentMethod === "card") {
      if (!paymentData.cardNumber.trim())
        newErrors.cardNumber = "Card number is required";
      if (!paymentData.expiryDate.trim())
        newErrors.expiryDate = "Expiry date is required";
      if (!paymentData.cvv.trim()) newErrors.cvv = "CVV is required";
      if (!paymentData.cardName.trim())
        newErrors.cardName = "Cardholder name is required";

      if (
        paymentData.cardNumber &&
        paymentData.cardNumber.replace(/\s/g, "").length !== 16
      ) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (paymentData.cvv && paymentData.cvv.length !== 3) {
        newErrors.cvv = "Please enter a valid 3-digit CVV";
      }
    }

    if (paymentData.paymentMethod === "upi") {
      if (!paymentData.upiId) newErrors.upiId = "UPI ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);

    try {
      const orderData = {
        userId: user.id,
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount: finalTotal,
        shippingAddress: shippingData,
        paymentDetails: {
          method: paymentData.paymentMethod,
          ...(paymentData.paymentMethod === "card" && {
            last4: paymentData.cardNumber.slice(-4),
          }),
          ...(paymentData.paymentMethod === "upi" && {
            upiId: paymentData.upiId,
          }),
        },
      };

      const response = await orderApi.createOrder(orderData);

      // Clear cart after successful order
      dispatch(clearCart());
      setOrderPlaced(true);

      // Redirect to order confirmation after a short delay
      setTimeout(() => {
        navigate(`/order/${response.data.id}`);
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. You will be redirected shortly.
          </p>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= stepNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                <div
                  className={`text-sm ml-2 ${
                    step >= stepNumber ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {stepNumber === 1 && "Shipping"}
                  {stepNumber === 2 && "Payment"}
                  {stepNumber === 3 && "Review"}
                </div>
                {stepNumber < 3 && (
                  <div className="flex-1 h-1 mx-4 bg-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={shippingData.fullName}
                    onChange={handleShippingChange}
                    error={errors.fullName}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={shippingData.email}
                    onChange={handleShippingChange}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={shippingData.phone}
                    onChange={handleShippingChange}
                    error={errors.phone}
                    placeholder="10-digit mobile number"
                    required
                  />
                  <div></div>
                  <div className="md:col-span-2">
                    <Input
                      label="Address"
                      name="address"
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      error={errors.address}
                      placeholder="Street address, apartment, suite, etc."
                      required
                    />
                  </div>
                  <Input
                    label="City"
                    name="city"
                    value={shippingData.city}
                    onChange={handleShippingChange}
                    error={errors.city}
                    required
                  />
                  <Input
                    label="State"
                    name="state"
                    value={shippingData.state}
                    onChange={handleShippingChange}
                    error={errors.state}
                    required
                  />
                  <Input
                    label="Pincode"
                    name="pincode"
                    value={shippingData.pincode}
                    onChange={handleShippingChange}
                    error={errors.pincode}
                    placeholder="6-digit pincode"
                    required
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={shippingData.country}
                    onChange={handleShippingChange}
                    disabled
                  />
                </div>

                <div className="mt-6">
                  <Button onClick={handleNextStep}>Continue to Payment</Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Payment Information
                </h2>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentData.paymentMethod === "card"}
                        onChange={handlePaymentChange}
                        className="mr-3"
                      />
                      Credit/Debit Card
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentData.paymentMethod === "upi"}
                        onChange={handlePaymentChange}
                        className="mr-3"
                      />
                      UPI
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentData.paymentMethod === "cod"}
                        onChange={handlePaymentChange}
                        className="mr-3"
                      />
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                {/* Card Payment Form */}
                {paymentData.paymentMethod === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        label="Card Number"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        error={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentChange}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      error={errors.cvv}
                      placeholder="123"
                      required
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Cardholder Name"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        error={errors.cardName}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* UPI Payment Form */}
                {paymentData.paymentMethod === "upi" && (
                  <Input
                    label="UPI ID"
                    name="upiId"
                    value={paymentData.upiId || ""}
                    onChange={handlePaymentChange}
                    error={errors.upiId}
                    placeholder="yourname@upi"
                    required
                  />
                )}

                {/* COD Message */}
                {paymentData.paymentMethod === "cod" && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-800">
                      💰 You will pay in cash when your order is delivered.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back to Shipping
                  </Button>
                  <Button onClick={handleNextStep}>Continue to Review</Button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Review Your Order
                </h2>

                {/* Shipping Address */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="text-gray-600">
                    <p>{shippingData.fullName}</p>
                    <p>{shippingData.address}</p>
                    <p>
                      {shippingData.city}, {shippingData.state}{" "}
                      {shippingData.pincode}
                    </p>
                    <p>{shippingData.phone}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p className="text-gray-600 capitalize">
                    {paymentData.paymentMethod === "card" &&
                      `Credit/Debit Card ending in ${paymentData.cardNumber.slice(
                        -4
                      )}`}
                    {paymentData.paymentMethod === "upi" &&
                      `UPI (${paymentData.upiId})`}
                    {paymentData.paymentMethod === "cod" && "Cash on Delivery"}
                  </p>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-3 border rounded-md"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back to Payment
                  </Button>
                  <Button onClick={handlePlaceOrder} disabled={isLoading}>
                    {isLoading ? (
                      <Spinner size="small" />
                    ) : (
                      `Place Order (₹${finalTotal.toLocaleString()})`
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>
                  Subtotal (
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {shippingCost === 0 && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-sm">
                  🎉 Free shipping applied!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
