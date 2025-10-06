import type { User, LoginCredentials, RegisterData } from '../types/User';

export const authUtils = {
  getUsers: (): User[] => {
    const users = localStorage.getItem('auction_users');
    return users ? JSON.parse(users) : [];
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem('auction_users', JSON.stringify(users));
  },

  register: (data: RegisterData): { success: boolean; message: string } => {
    const users = authUtils.getUsers();
    
    if (data.password !== data.confirmPassword) {
      return { success: false, message: 'Las contraseñas no coinciden' };
    }

    if (users.find(user => user.email === data.email)) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      createdAt: new Date()
    };

    users.push(newUser);
    authUtils.saveUsers(users);
    
    return { success: true, message: 'Usuario registrado exitosamente' };
  },

  login: (credentials: LoginCredentials): { success: boolean; message: string; user?: User } => {
    const users = authUtils.getUsers();
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
      return { success: true, message: 'Inicio de sesión exitoso', user };
    } else {
      return { success: false, message: 'Email o contraseña incorrectos' };
    }
  },

  logout: (): void => {
    localStorage.removeItem('current_user');
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  }
};