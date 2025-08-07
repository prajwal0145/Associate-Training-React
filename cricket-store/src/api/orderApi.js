const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let mockOrders = [];

export const orderApi = {
  createOrder: async (orderData) => {
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

  getUserOrders: async (userId) => {
    await delay(400);
    const userOrders = mockOrders.filter((order) => order.userId === userId);
    return { data: userOrders };
  },

  getOrderById: async (orderId) => {
    await delay(300);
    const order = mockOrders.find((order) => order.id === parseInt(orderId));
    if (!order) {
      throw new Error("Order not found");
    }
    return { data: order };
  },
};
