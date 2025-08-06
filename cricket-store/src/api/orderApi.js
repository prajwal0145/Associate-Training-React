let mockOrders = [];

export const orderApi = {
  // Create order
  createOrder: async (orderData) => {
    // eslint-disable-next-line no-undef
    await delay(1000);

    const newOrder = {
      id: mockOrders.length + 1,
      userId: orderData.userId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      status: "pending",
      createdAt: new Date().toISOString(),
      paymentDetails: orderData.paymentDetails,
    };

    mockOrders.push(newOrder);
    return { data: newOrder };
  },

  // Get user orders
  getUserOrders: async (userId) => {
    // eslint-disable-next-line no-undef
    await delay(400);
    const userOrders = mockOrders.filter((order) => order.userId === userId);
    return { data: userOrders };
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    // eslint-disable-next-line no-undef
    await delay(300);
    const order = mockOrders.find((order) => order.id === parseInt(orderId));
    if (!order) {
      throw new Error("Order not found");
    }
    return { data: order };
  },
};
