import { mockUsers } from "../data/mockData";

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  // Login user
  login: async (email, password) => {
    await delay(800);
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Generate a mock token
    const token = `mock-token-${user.id}-${Date.now()}`;

    return {
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    };
  },

  // Register user
  register: async (userData) => {
    await delay(1000);

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "customer",
    };

    mockUsers.push(newUser);

    const token = `mock-token-${newUser.id}-${Date.now()}`;

    return {
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      },
    };
  },

  // Verify token (for protected routes)
  verifyToken: async (token) => {
    await delay(200);
    // Simple token validation (in real app, this would be more secure)
    if (token && token.startsWith("mock-token-")) {
      const userId = parseInt(token.split("-")[2]);
      const user = mockUsers.find((u) => u.id === userId);
      if (user) {
        return {
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      }
    }
    throw new Error("Invalid token");
  },
};
