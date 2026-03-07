import type { MCPServer } from '~/lib/services/mcpService';
import McpStatusBadge from '~/components/@settings/tabs/mcp/components/McpStatusBadge';
import McpServerListItem from '~/components/@settings/tabs/mcp/components/McpServerListItem';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type McpServerListProps = {
  serverEntries: [string, MCPServer][];
  expandedServer: string | null;
  checkingServers: boolean;
  onlyShowAvailableServers?: boolean;
  toggleServerExpanded: (serverName: string) => void;
};

export default function McpServerList({
  serverEntries,
  expandedServer,
  checkingServers,
  onlyShowAvailableServers = false,
  toggleServerExpanded,
}: McpServerListProps) {
  const { t } = useTranslation('settings');

  if (serverEntries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-bolt-elements-borderColor p-8 text-center text-bolt-elements-textSecondary opacity-80"
      >
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary">
          <div className="i-ph:plugs-connected-duotone h-6 w-6" />
        </div>
        <p className="text-sm">{t('mcpTab.noServersConfigured')}</p>
      </motion.div>
    );
  }

  const filteredEntries = onlyShowAvailableServers
    ? serverEntries.filter(([, s]) => s.status === 'available')
    : serverEntries;

  return (
    <div className="grid w-full grid-cols-1 gap-3">
      {filteredEntries.map(([serverName, mcpServer], index) => {
        const isAvailable = mcpServer.status === 'available';
        const isExpanded = expandedServer === serverName;
        const serverTools = isAvailable ? Object.entries(mcpServer.tools) : [];

        return (
          <motion.div
            key={serverName}
            className="flex w-full flex-col rounded-xl border border-bolt-elements-borderColor p-4 shadow-sm transition-all duration-200 hover:border-bolt-elements-borderColor-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => toggleServerExpanded(serverName)}
                  className="group flex w-full items-center gap-2 rounded-lg border-none bg-transparent p-0 text-bolt-elements-textPrimary transition-colors appearance-none cursor-pointer outline-none shadow-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent focus-visible:border-transparent focus:shadow-none focus-visible:shadow-none"
                  aria-expanded={isExpanded}
                >
                  <div
                    className={`i-ph:${isExpanded ? 'caret-down' : 'caret-right'} w-4 h-4 text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary transition-all duration-150`}
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <span className="font-semibold truncate text-[15px]">{serverName}</span>
                    <div className="w-full truncate">
                      {mcpServer.config.type === 'sse' || mcpServer.config.type === 'streamable-http' ? (
                        <span className="text-[13px] text-bolt-elements-textSecondary font-mono opacity-70 truncate block">
                          {mcpServer.config.url}
                        </span>
                      ) : (
                        <span className="text-[13px] text-bolt-elements-textSecondary font-mono opacity-70 truncate block">
                          {mcpServer.config.command} {mcpServer.config.args?.join(' ')}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              <div className="ml-2 flex-shrink-0">
                {checkingServers ? (
                  <McpStatusBadge status="checking" />
                ) : (
                  <McpStatusBadge status={isAvailable ? 'available' : 'unavailable'} />
                )}
              </div>
            </div>

            {/* Error message */}
            {!isAvailable && mcpServer.error && (
              <div className="mt-3 ml-6 p-2 rounded text-[11px] text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                <span className="font-medium">{t('mcpTab.error')}</span> {mcpServer.error}
              </div>
            )}

            {/* Tool list */}
            {isExpanded && isAvailable && (
              <div className="mt-4 pt-4 border-t border-bolt-elements-borderColor">
                <div className="flex items-center gap-2 text-bolt-elements-textSecondary text-[11px] font-bold uppercase tracking-widest ml-1 mb-3">
                  <div className="i-ph:wrench-duotone w-3 h-3" />
                  {t('mcpTab.availableTools')}
                </div>
                {serverTools.length === 0 ? (
                  <div className="ml-4 text-xs text-bolt-elements-textSecondary italic">
                    {t('mcpTab.noToolsAvailable')}
                  </div>
                ) : (
                  <div className="mt-1 space-y-3">
                    {serverTools.map(([toolName, toolSchema]) => (
                      <McpServerListItem
                        key={`${serverName}-${toolName}`}
                        toolName={toolName}
                        toolSchema={toolSchema}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
