import mongoose from 'mongoose';

const socialHandlesSchema = new mongoose.Schema(
  {
    instagram: { type: String, default: '' },
    tiktok: { type: String, default: '' },
    youtube: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    x: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    displayName: { type: String, default: '' },
    companyName: { type: String, default: '' },
    creatorCategory: { type: String, default: '' },
    website: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    phone: { type: String, default: '' },
    primaryPlatform: { type: String, default: '' },
    teamSize: { type: String, default: '' },
    socialHandles: { type: socialHandlesSchema, default: () => ({}) },
  },
  { _id: false }
);

const onboardingSchema = new mongoose.Schema(
  {
    completedSteps: { type: [String], default: ['account_created'] },
    profileCompletion: { type: Number, default: 0 },
    signupSource: { type: String, default: 'email' },
    interestedFeatures: { type: [String], default: [] },
  },
  { _id: false }
);

const oauthSchema = new mongoose.Schema(
  {
    googleSub: { type: String, default: '' },
    facebookId: { type: String, default: '' },
    appleSub: { type: String, default: '' },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    role: { type: String, required: true, enum: ['creator', 'brand', 'admin'] },
    passwordHash: { type: String, default: '' },
    isEmailVerified: { type: Boolean, default: false },
    oauth: { type: oauthSchema, default: () => ({}) },
    emailVerificationTokenHash: { type: String, default: '' },
    emailVerificationExpiresAt: { type: String, default: '' },
    profile: { type: profileSchema, default: () => ({}) },
    onboarding: { type: onboardingSchema, default: () => ({}) },
    createdAt: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
