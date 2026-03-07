import { useEffect, useMemo, useState } from 'react';
import { classNames } from '~/utils/classNames';
import { Dialog, DialogRoot, DialogClose, DialogTitle, DialogButton } from '~/components/ui/Dialog';
import { IconButton } from '~/components/ui/IconButton';
import { Tooltip } from '~/components/ui/Tooltip';
import { useMCPStore } from '~/lib/stores/mcp';
import McpServerList from '~/components/@settings/tabs/mcp/components/McpServerList';
import { useTranslation } from 'react-i18next';

export function McpTools() {
  const { t, i18n } = useTranslation('settings');
  const isInitialized = useMCPStore((state) => state.isInitialized);
  const serverTools = useMCPStore((state) => state.serverTools);
  const lastCheckedAt = useMCPStore((state) => state.lastCheckedAt);
  const initialize = useMCPStore((state) => state.initialize);
  const checkServersAvailabilities = useMCPStore((state) => state.checkServersAvailabilities);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingServers, setIsCheckingServers] = useState(false);
  const [expandedServer, setExpandedServer] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized]);

  const checkServerAvailability = async () => {
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

  const handleDialogOpen = (open: boolean) => {
    setIsDialogOpen(open);
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

  return (
    <div className="relative">
      <div className="flex">
        <IconButton
          onClick={() => setIsDialogOpen(!isDialogOpen)}
          title={t('mcpTab.toolsButtonTitle')}
          disabled={!isInitialized}
          className="transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isInitialized ? (
            <div className="i-svg-spinners:90-ring-with-bg text-bolt-elements-loader-progress text-xl animate-spin"></div>
          ) : (
            <div className="i-bolt:mcp text-xl"></div>
          )}
        </IconButton>
      </div>

      <DialogRoot open={isDialogOpen} onOpenChange={handleDialogOpen}>
        {isDialogOpen && (
          <Dialog className="max-w-4xl w-full p-6">
            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
              <DialogTitle>
                <div className="i-bolt:mcp text-xl"></div>
                <span>{t('mcpTab.toolsDialogTitle')}</span>
                <Tooltip
                  content={
                    <div className="space-y-1">
                      <p>{t('mcpTab.onlyAvailableHint')}</p>
                      <p>{t('mcpTab.configureInSettings')}</p>
                    </div>
                  }
                >
                  <span
                    className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-bolt-elements-textSecondary transition-colors hover:text-bolt-elements-textPrimary cursor-help"
                    aria-label={t('mcpTab.onlyAvailableHint')}
                  >
                    <div className="i-ph:question text-sm" />
                  </span>
                </Tooltip>
              </DialogTitle>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="text-xs text-bolt-elements-textSecondary">
                      {t('mcpTab.lastCheckedAt')}: {formattedLastCheckedAt}
                    </div>
                    <button
                      onClick={checkServerAvailability}
                      disabled={isCheckingServers || serverEntries.length === 0}
                      className={classNames(
                        'px-3 py-1.5 rounded-lg text-sm',
                        'bg-bolt-elements-background-depth-3 hover:bg-bolt-elements-background-depth-4',
                        'text-bolt-elements-textPrimary',
                        'transition-all duration-200',
                        'flex items-center gap-2',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                      )}
                    >
                      {isCheckingServers ? (
                        <div className="i-svg-spinners:90-ring-with-bg w-3 h-3 text-bolt-elements-loader-progress animate-spin" />
                      ) : (
                        <div className="i-ph:arrow-counter-clockwise w-3 h-3" />
                      )}
                      {t('mcpTab.checkAvailability')}
                    </button>
                  </div>
                  {serverEntries.length > 0 ? (
                    <McpServerList
                      checkingServers={isCheckingServers}
                      expandedServer={expandedServer}
                      serverEntries={serverEntries}
                      onlyShowAvailableServers={true}
                      toggleServerExpanded={toggleServerExpanded}
                    />
                  ) : (
                    <div className="py-4 text-center text-bolt-elements-textSecondary">
                      <p>{t('mcpTab.noServersConfigured')}</p>
                      <p className="text-xs mt-1">{t('mcpTab.configureInSettings')}</p>
                    </div>
                  )}
                </div>

                <div>{error && <p className="mt-2 text-sm text-bolt-elements-icon-error">{error}</p>}</div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <div className="flex gap-2">
                  <DialogClose asChild>
                    <DialogButton type="secondary">{t('mcpTab.close')}</DialogButton>
                  </DialogClose>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </DialogRoot>
    </div>
  );
}
