'use client';

import { useMemo, useState } from 'react';
import type { AuthUser } from '../../../lib/authClient';
import { updateProfile } from '../../../lib/authClient';

export default function ProfilePanel({
  user,
  onUserChange,
}: {
  user: AuthUser;
  onUserChange: (user: AuthUser) => void;
}) {
  const [form, setForm] = useState({
    displayName: user.profile?.displayName || '',
    companyName: user.profile?.companyName || '',
    creatorCategory: user.profile?.creatorCategory || '',
    website: user.profile?.website || '',
    location: user.profile?.location || '',
    bio: user.profile?.bio || '',
    instagram: user.profile?.socialHandles?.instagram || '',
    tiktok: user.profile?.socialHandles?.tiktok || '',
    youtube: user.profile?.socialHandles?.youtube || '',
    linkedin: user.profile?.socialHandles?.linkedin || '',
    x: user.profile?.socialHandles?.x || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const connectedCount = useMemo(
    () => Object.values(user.profile?.socialHandles || {}).filter((value) => typeof value === 'string' && value.trim()).length,
    [user]
  );

  const profileCompletion = user.onboarding?.profileCompletion ?? 0;

  async function onSave() {
    setSaving(true);
    setMessage(null);
    try {
      const updated = await updateProfile({
        displayName: form.displayName,
        companyName: form.companyName,
        creatorCategory: form.creatorCategory,
        website: form.website,
        location: form.location,
        bio: form.bio,
        socialHandles: {
          instagram: form.instagram,
          tiktok: form.tiktok,
          youtube: form.youtube,
          linkedin: form.linkedin,
          x: form.x,
          website: form.website,
        },
      });
      onUserChange(updated);
      setMessage('Profile saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">Profile readiness</div>
          <div className="mt-1 text-sm text-gray-600">Keep your account onboarding-complete and ready for matching.</div>
        </div>
        <div className="rounded-xl bg-[#0B0B0F] px-3 py-2 text-sm text-white">{profileCompletion}% complete</div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-[#3F5AE0]" style={{ width: `${profileCompletion}%` }} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500">Connected channels</div>
          <div className="mt-1 text-2xl font-semibold">{connectedCount}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500">Signup source</div>
          <div className="mt-1 text-2xl font-semibold">{user.onboarding?.signupSource || 'email'}</div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Display name" value={form.displayName} onChange={(value) => update('displayName', value)} />
        {user.role === 'brand' ? (
          <Field label="Company name" value={form.companyName} onChange={(value) => update('companyName', value)} />
        ) : (
          <Field label="Creator category" value={form.creatorCategory} onChange={(value) => update('creatorCategory', value)} />
        )}
        <Field label="Website" value={form.website} onChange={(value) => update('website', value)} />
        <Field label="Location" value={form.location} onChange={(value) => update('location', value)} />
        <Field label="Instagram" value={form.instagram} onChange={(value) => update('instagram', value)} />
        <Field label="TikTok" value={form.tiktok} onChange={(value) => update('tiktok', value)} />
        <Field label="YouTube" value={form.youtube} onChange={(value) => update('youtube', value)} />
        <Field label="LinkedIn" value={form.linkedin} onChange={(value) => update('linkedin', value)} />
        <Field label="X" value={form.x} onChange={(value) => update('x', value)} />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700">Bio</label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => update('bio', e.target.value)}
          className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-xl bg-[#3F5AE0] px-4 py-2 text-sm text-white shadow-[0_14px_30px_rgba(63,90,224,0.28)]"
        >
          {saving ? 'Saving...' : 'Save profile'}
        </button>
        {message && <div className="text-sm text-gray-600">{message}</div>}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/20"
      />
    </div>
  );
}
