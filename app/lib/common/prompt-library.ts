import { getSystemPrompt } from './prompts/prompts';
import optimized from './prompts/optimized';
import { getFineTunedPrompt } from './prompts/new-prompt';
import type { DesignScheme } from '~/types/design-scheme';

export interface PromptOptions {
  cwd: string;
  allowedHtmlElements: string[];
  modificationTagName: string;
  designScheme?: DesignScheme;
  supabase?: {
    isConnected: boolean;
    hasSelectedProject: boolean;
    credentials?: {
      anonKey?: string;
      supabaseUrl?: string;
    };
  };
}

export interface LocalizedPrompt {
  id: string;
  label: string;
  description: string;
}

export class PromptLibrary {
  static library: Record<
    string,
    {
      label: string;
      description: string;
      get: (options: PromptOptions) => string;
    }
  > = {
    default: {
      label: 'Default Prompt',
      description: 'An fine tuned prompt for better results and less token usage',
      get: (options) => getFineTunedPrompt(options.cwd, options.supabase, options.designScheme),
    },
    original: {
      label: 'Old Default Prompt',
      description: 'The OG battle tested default system Prompt',
      get: (options) => getSystemPrompt(options.cwd, options.supabase, options.designScheme),
    },
    optimized: {
      label: 'Optimized Prompt (experimental)',
      description: 'An Experimental version of the prompt for lower token usage',
      get: (options) => optimized(options),
    },
  };

  static getList() {
    return Object.entries(this.library).map(([key, value]) => {
      const { label, description } = value;
      return {
        id: key,
        label,
        description,
      };
    });
  }

  static getLocalizedList(t: (key: string) => string): LocalizedPrompt[] {
    return Object.entries(this.library).map(([key]) => {
      const keys: Record<string, { labelKey: string; descKey: string }> = {
        default: { labelKey: 'defaultPrompt', descKey: 'defaultPromptDesc' },
        original: { labelKey: 'oldDefaultPrompt', descKey: 'oldDefaultPromptDesc' },
        optimized: { labelKey: 'optimizedPrompt', descKey: 'optimizedPromptDesc' },
      };

      const { labelKey, descKey } = keys[key] || { labelKey: '', descKey: '' };

      return {
        id: key,
        label: labelKey ? t(labelKey as any) : this.library[key].label,
        description: descKey ? t(descKey as any) : this.library[key].description,
      };
    });
  }

  static getPropmtFromLibrary(promptId: string, options: PromptOptions) {
    const prompt = this.library[promptId];

    if (!prompt) {
      throw 'Prompt Now Found';
    }

    return this.library[promptId]?.get(options);
  }
}
