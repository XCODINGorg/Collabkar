'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearToken } from '../../../lib/authClient';

export default function TopBar({ title }: { title: string }) {
  const router = useRouter();

  const logout = () => {
    clearToken();
    router.replace('/login');
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-white border-b px-6 py-4">
      <div>
        <div className="text-sm text-gray-500">Collabkar</div>
        <div className="text-xl font-bold">{title}</div>
      </div>
      <div className="flex items-center gap-3">
        <Link className="text-sm text-blue-700 underline" href="/">Home</Link>
        <button
          onClick={logout}
          className="text-sm bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-black"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

