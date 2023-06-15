import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

async function useUser() {
  const supabse = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  useQuery({
    queryKey: ['user'],
    queryFn: async () => (await supabse.auth.getUser()).data.user,
    onSuccess: (data) => setUser(data),
  });

  return { user };
}

export default useUser;
