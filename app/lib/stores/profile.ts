import { atom } from 'nanostores';
import { STORAGE_KEY_PROFILE } from '~/lib/persistence/storageKeys';

interface Profile {
  username: string;
  bio: string;
  avatar: string;
}

// Initialize with stored profile or defaults
const storedProfile = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_PROFILE) : null;
const initialProfile: Profile = storedProfile
  ? JSON.parse(storedProfile)
  : {
      username: '',
      bio: '',
      avatar: '',
    };

export const profileStore = atom<Profile>(initialProfile);

export const updateProfile = (updates: Partial<Profile>) => {
  profileStore.set({ ...profileStore.get(), ...updates });

  // Persist to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profileStore.get()));
  }
};
