'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearToken, fetchMe } from '../../lib/authClient';

export default function DashboardIndex() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const user = await fetchMe();
        if (user.role === 'creator') return router.replace('/dashboard/creator');
        if (user.role === 'brand') return router.replace('/dashboard/brand');
        return router.replace('/dashboard/admin');
      } catch {
        clearToken();
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-gray-700">{loading ? 'Loading dashboard…' : 'Redirecting…'}</div>
    </div>
  );
}

