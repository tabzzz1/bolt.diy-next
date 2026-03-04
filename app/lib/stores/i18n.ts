import { atom } from 'nanostores';
import i18n from '~/lib/i18n/config';
import { STORAGE_KEY_USER_PROFILE } from '~/lib/persistence/storageKeys';

export type Language = 'en' | 'zh';

export const DEFAULT_LANGUAGE: Language = 'en';

function initLanguageStore(): Language {
  if (!import.meta.env.SSR) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER_PROFILE);
      const profile = raw ? JSON.parse(raw) : {};

      return profile.language === 'zh' ? 'zh' : DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }

  return DEFAULT_LANGUAGE;
}

/** 当前语言的响应式 atom，供不使用 useTranslation 的组件订阅（如日期 locale） */
export const languageStore = atom<Language>(initLanguageStore());

/**
 * 切换语言的统一入口。
 * 同步完成三件事：
 * 1. 更新 nanostores atom（触发订阅此 store 的组件重渲染）
 * 2. 通知 i18next（触发 useTranslation() 的组件重渲染）
 * 3. 持久化到 localStorage（合并写入，不覆盖 profile 中其他字段）
 */
export function setLanguage(lang: Language): void {
  languageStore.set(lang);
  i18n.changeLanguage(lang);

  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_PROFILE);
    const profile = raw ? JSON.parse(raw) : {};
    profile.language = lang;
    localStorage.setItem(STORAGE_KEY_USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
}
