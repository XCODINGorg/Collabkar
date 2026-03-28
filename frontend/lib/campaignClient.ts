import { apiUrl } from './api';
import { getToken } from './authClient';

export type CampaignRecord = {
  _id: string;
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
  title: string;
  description: string;
  targetNiche: string;
  targetLocation: string;
  budgetMin: number;
  budgetMax: number;
  deliverables: string[];
  status: 'draft' | 'active' | 'paused' | 'closed';
  applicationsCount: number;
  shortlistedCount: number;
  createdAt: string;
  updatedAt: string;
};

async function authedRequest(path: string, init?: RequestInit) {
  const token = getToken();
  if (!token) throw new Error('missing_token');

  const response = await fetch(apiUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
    ...init,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error || 'campaign_request_failed');
  return data;
}

export async function fetchMyCampaigns(): Promise<CampaignRecord[]> {
  const data = await authedRequest('/api/campaigns/mine');
  return Array.isArray(data?.campaigns) ? data.campaigns : [];
}

export async function fetchActiveCampaigns(): Promise<CampaignRecord[]> {
  const response = await fetch(apiUrl('/api/campaigns/active'));
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error || 'active_campaigns_failed');
  return Array.isArray(data?.campaigns) ? data.campaigns : [];
}

export async function createCampaign(payload: {
  title: string;
  description: string;
  targetNiche: string;
  targetLocation: string;
  budgetMin: number;
  budgetMax: number;
  deliverables: string[];
  status?: string;
}) {
  const data = await authedRequest('/api/campaigns', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.campaign as CampaignRecord;
}

export async function updateCampaign(id: string, payload: Partial<CampaignRecord>) {
  const data = await authedRequest(`/api/campaigns/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return data.campaign as CampaignRecord;
}
