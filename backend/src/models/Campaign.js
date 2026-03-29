import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    ownerId: { type: String, required: true, index: true },
    ownerEmail: { type: String, default: '' },
    ownerName: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    targetNiche: { type: String, default: '', trim: true },
    targetLocation: { type: String, default: '', trim: true },
    budgetMin: { type: Number, default: 0, min: 0 },
    budgetMax: { type: Number, default: 0, min: 0 },
    deliverables: { type: [String], default: [] },
    status: { type: String, enum: ['draft', 'active', 'paused', 'closed'], default: 'draft' },
    applicationsCount: { type: Number, default: 0, min: 0 },
    shortlistedCount: { type: Number, default: 0, min: 0 },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
