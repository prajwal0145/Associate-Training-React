import { mockUsers } from "../data/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  login: async (email, password) => {
    await delay(800);
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

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

  register: async (userData) => {
    await delay(1000);

    const existingUser = mockUsers.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

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

  verifyToken: async (token) => {
    await delay(200);

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
