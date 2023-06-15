import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserTypes {
   user: User | null;
   setUser: (data: any) => void;
}

export const useUserStore = create<UserTypes>((set) => ({
   user: null,
   setUser: (data: any) => set(() => ({ user: data })),
}));
