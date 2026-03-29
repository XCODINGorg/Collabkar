import mongoose from 'mongoose';

const USERNAME_REGEX = /^[a-zA-Z0-9._]{1,30}$/;

const influencerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (value) => USERNAME_REGEX.test(value),
        message: 'Username must be 1-30 characters and contain only letters, numbers, dots, or underscores.',
      },
    },
    followers: { type: Number, required: true, min: 0 },
    avgLikes: { type: Number, required: true, min: 0 },
    avgComments: { type: Number, required: true, min: 0 },
    engagementRate: { type: Number, required: true, min: 0 },
    postFrequency: { type: Number, required: true, min: 0 },
    niche: { type: String, required: true, trim: true },
    location: { type: String, default: '', trim: true },
    riskLevel: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    verificationCode: { type: String, default: '', trim: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const Influencer =
  mongoose.models.Influencer || mongoose.model('Influencer', influencerSchema);

