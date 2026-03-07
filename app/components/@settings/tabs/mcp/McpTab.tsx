import { useEffect, useMemo, useState } from 'react';
import { classNames } from '~/utils/classNames';
import type { MCPConfig } from '~/lib/services/mcpService';
import { toast } from 'react-toastify';
import { useMCPStore } from '~/lib/stores/mcp';
import McpServerList from '~/components/@settings/tabs/mcp/components/McpServerList';
import { useTranslation } from 'react-i18next';

const EXAMPLE_MCP_CONFIG: MCPConfig = {
  mcpServers: {
    deepwiki: {
      type: 'streamable-http',
      url: 'https://mcp.deepwiki.com/mcp',
    },
  },
};

const EMPTY_MCP_CONFIG_TEMPLATE: MCPConfig = {
  mcpServers: {},
};

export default function McpTab() {
  const { t, i18n } = useTranslation('settings');
  const settings = useMCPStore((state) => state.settings);
  const isInitialized = useMCPStore((state) => state.isInitialized);
  const serverTools = useMCPStore((state) => state.serverTools);
  const lastCheckedAt = useMCPStore((state) => state.lastCheckedAt);
  const initialize = useMCPStore((state) => state.initialize);
  const updateSettings = useMCPStore((state) => state.updateSettings);
  const checkServersAvailabilities = useMCPStore((state) => state.checkServersAvailabilities);

  const [isSaving, setIsSaving] = useState(false);
  const [mcpConfigText, setMCPConfigText] = useState('');
  const [maxLLMSteps, setMaxLLMSteps] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingServers, setIsCheckingServers] = useState(false);
  const [expandedServer, setExpandedServer] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      initialize().catch((err) => {
        setError(t('mcpTab.initializeFailed', { message: err instanceof Error ? err.message : String(err) }));
        toast.error(t('mcpTab.loadConfigFailed'));
      });
    }
  }, [isInitialized, initialize, t]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    const serializedConfig = JSON.stringify(settings.mcpConfig, null, 2);

    setMCPConfigText(serializedConfig);
    setMaxLLMSteps(settings.maxLLMSteps);
    setError(null);
  }, [isInitialized, settings]);

  const parsedConfig = useMemo(() => {
    try {
      setError(null);
      return JSON.parse(mcpConfigText) as MCPConfig;
    } catch (e) {
      setError(`Invalid JSON format: ${e instanceof Error ? e.message : String(e)}`);
      return null;
    }
  }, [mcpConfigText]);

  const handleMaxLLMCallChange = (value: string) => {
    setMaxLLMSteps(parseInt(value, 10));
  };

  const handleSave = async () => {
    if (!parsedConfig) {
      return;
    }

    setIsSaving(true);

    try {
      await updateSettings({
        mcpConfig: parsedConfig,
        maxLLMSteps,
      });
      toast.success(t('saveSuccess'));

      setError(null);
    } catch (e) {
      setError(t('mcpTab.saveConfigFailed', { message: e instanceof Error ? e.message : String(e) }));
      toast.error(t('saveFail'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadExample = () => {
    setMCPConfigText(JSON.stringify(EXAMPLE_MCP_CONFIG, null, 2));
    setError(null);
  };

  const handleResetConfig = () => {
    setMCPConfigText(JSON.stringify(EMPTY_MCP_CONFIG_TEMPLATE, null, 2));
    setError(null);
  };

  const serverEntries = useMemo(() => Object.entries(serverTools), [serverTools]);
  const formattedLastCheckedAt = useMemo(() => {
    if (!lastCheckedAt) {
      return '--';
    }

    const locale = i18n.language?.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !locale.startsWith('zh'),
    }).format(lastCheckedAt);
  }, [i18n.language, lastCheckedAt]);

  const checkServerAvailability = async () => {
    if (serverEntries.length === 0) {
      return;
    }

    setIsCheckingServers(true);
    setError(null);

    try {
      await checkServersAvailabilities();
    } catch (e) {
      setError(t('mcpTab.checkAvailabilityFailed', { message: e instanceof Error ? e.message : String(e) }));
    } finally {
      setIsCheckingServers(false);
    }
  };

  const toggleServerExpanded = (serverName: string) => {
    setExpandedServer(expandedServer === serverName ? null : serverName);
  };

  return (
    <div className="w-full max-w-none space-y-8 p-1">
      <section aria-labelledby="server-status-heading">
        <div className="mb-6 flex w-full items-center justify-between gap-4 text-left">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 id="server-status-heading" className="text-xl font-bold text-bolt-elements-textPrimary">
              {t('mcpTab.serversConfigured')}
            </h2>
            <p className="text-sm text-bolt-elements-textSecondary opacity-80 decoration-none">
              {t('mcpTab.serverStatusDescription')}
            </p>
          </div>
          <button
            onClick={checkServerAvailability}
            disabled={isCheckingServers || !parsedConfig || serverEntries.length === 0}
            className={classNames(
              'inline-flex h-10 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-medium',
              'bg-bolt-elements-background-depth-2 hover:bg-bolt-elements-background-depth-3',
              'border border-bolt-elements-borderColor text-bolt-elements-textPrimary',
              'transition-all duration-200 shadow-sm active:scale-95',
              'gap-2.5 whitespace-nowrap',
              'disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed',
            )}
          >
            {isCheckingServers ? (
              <div className="i-svg-spinners:90-ring-with-bg w-4 h-4 text-bolt-elements-loader-progress animate-spin" />
            ) : (
              <div className="i-ph:arrow-counter-clockwise w-4 h-4" />
            )}
            {t('mcpTab.checkAvailability')}
          </button>
        </div>
        <div className="mb-3 flex w-full justify-end text-xs text-bolt-elements-textSecondary">
          <span>
            {t('mcpTab.lastCheckedAt')}: {formattedLastCheckedAt}
          </span>
        </div>
        <McpServerList
          checkingServers={isCheckingServers}
          expandedServer={expandedServer}
          serverEntries={serverEntries}
          toggleServerExpanded={toggleServerExpanded}
        />
      </section>

      <div className="h-px bg-bolt-elements-borderColor opacity-50" />

      <section aria-labelledby="config-section-heading">
        <div className="mb-6 flex w-full items-center gap-4 text-left">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="i-ph:gear-duotone h-6 w-6 text-bolt-elements-textPrimary opacity-60" />
            <h2 id="config-section-heading" className="text-xl font-bold text-bolt-elements-textPrimary">
              {t('mcpTab.configuration')}
            </h2>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-[minmax(0,2.2fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <div className="group relative">
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="mcp-config"
                  className="flex items-center gap-2 text-sm font-semibold text-bolt-elements-textPrimary"
                >
                  {t('mcpTab.configJson')}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetConfig}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-bolt-elements-borderColor bg-white px-3 py-1.5 text-xs font-semibold text-bolt-elements-textSecondary shadow-sm transition-colors hover:text-bolt-elements-textPrimary dark:bg-bolt-elements-background-depth-2"
                    title={t('mcpTab.resetConfigTitle')}
                  >
                    <div className="i-ph:arrow-u-up-left h-3.5 w-3.5" />
                    {t('mcpTab.reset')}
                  </button>
                  <button
                    onClick={handleLoadExample}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-bolt-elements-borderColor bg-white px-3 py-1.5 text-xs font-semibold text-bolt-elements-textSecondary shadow-sm transition-colors hover:text-bolt-elements-textPrimary dark:bg-bolt-elements-background-depth-2"
                  >
                    <div className="i-ph:lightning-duotone h-3.5 w-3.5" />
                    {t('mcpTab.loadExample')}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving || !parsedConfig}
                    className={classNames(
                      'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition-all active:scale-95',
                      'bg-blue-600 text-white hover:bg-blue-700',
                      'disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100',
                    )}
                  >
                    {isSaving ? (
                      <>
                        <div className="i-svg-spinners:90-ring-with-bg h-3.5 w-3.5 animate-spin" />
                        {t('mcpTab.savingConfig')}
                      </>
                    ) : (
                      <>
                        <div className="i-ph:floppy-disk-duotone h-3.5 w-3.5" />
                        {t('mcpTab.saveConfig')}
                      </>
                    )}
                  </button>
                </div>
              </div>
              <textarea
                id="mcp-config"
                value={mcpConfigText}
                onChange={(e) => setMCPConfigText(e.target.value)}
                spellCheck={false}
                className={classNames(
                  'w-full px-4 py-3 rounded-xl text-[13px] font-mono h-[400px] leading-relaxed',
                  'bg-white dark:bg-[#0A0A0A]',
                  'border-2 transition-all ring-offset-2 ring-offset-transparent',
                  error
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-bolt-elements-borderColor focus:border-blue-500',
                  'text-bolt-elements-textPrimary shadow-inner',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
                )}
              />
              {error && (
                <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                  <div className="i-ph:warning-circle-fill w-4 h-4 text-red-500 mt-0.5" />
                  <p className="text-xs text-red-600 dark:text-red-400 leading-normal font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-5 rounded-2xl bg-bolt-elements-background-depth-1 border border-bolt-elements-borderColor shadow-sm">
              <label htmlFor="max-llm-steps" className="block text-sm font-bold text-bolt-elements-textPrimary mb-2">
                {t('mcpTab.maxLlmSteps')}
              </label>
              <p className="text-[11px] text-bolt-elements-textSecondary mb-4 leading-relaxed opacity-80">
                {t('mcpTab.maxLlmStepsDescription')}
              </p>
              <div className="relative">
                <input
                  id="max-llm-steps"
                  type="number"
                  min="1"
                  max="20"
                  value={maxLLMSteps}
                  onChange={(e) => handleMaxLLMCallChange(e.target.value)}
                  className={classNames(
                    'w-full px-4 py-2.5 text-bolt-elements-textPrimary text-sm rounded-xl font-medium transition-all shadow-sm',
                    'bg-white dark:bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor focus:border-blue-500',
                    'focus:outline-none focus:ring-4 focus:ring-blue-500/10',
                  )}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-bolt-elements-background-depth-1 to-bolt-elements-background-depth-2 border border-bolt-elements-borderColor shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-bolt-elements-textPrimary">
                <div className="i-ph:info-duotone w-5 h-5 text-blue-500" />
                {t('mcpTab.helpTitle')}
              </div>
              <p className="text-xs text-bolt-elements-textSecondary leading-relaxed italic opacity-90">
                {t('mcpTab.formatNote')}
              </p>
              <a
                href="https://modelcontextprotocol.io/examples"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors mt-1"
              >
                {t('mcpTab.examplesLink')}
                <div className="i-ph:arrow-square-out w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-bolt-elements-background-depth-1 to-bolt-elements-background-depth-2 border border-bolt-elements-borderColor shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-bolt-elements-textPrimary">
                <div className="i-ph:magnifying-glass-duotone w-5 h-5 text-purple-500" />
                {t('mcpTab.discoveryTitle')}
              </div>
              <p className="text-xs text-bolt-elements-textSecondary leading-relaxed opacity-90">
                {t('mcpTab.discoveryDescription')}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'mcpmarket.com', url: 'https://mcpmarket.com' },
                  { name: 'mcp.so', url: 'https://mcp.so' },
                  { name: 'mcpmarket.cn', url: 'https://mcpmarket.cn' },
                ].map((site) => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bolt-elements-background-depth-3 text-xs font-medium text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-4 transition-all border border-bolt-elements-borderColor shadow-sm hover:shadow-md active:scale-95"
                  >
                    {site.name}
                    <div className="i-ph:arrow-square-out w-3.5 h-3.5 opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
