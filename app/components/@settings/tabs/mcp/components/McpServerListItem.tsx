import type { Tool } from 'ai';
import { useTranslation } from 'react-i18next';

type ParameterProperty = {
  type?: string;
  description?: string;
};

type ToolParameters = {
  jsonSchema: {
    properties?: Record<string, ParameterProperty>;
    required?: string[];
  };
};

type McpToolProps = {
  toolName: string;
  toolSchema: Tool;
};

export default function McpServerListItem({ toolName, toolSchema }: McpToolProps) {
  const { t } = useTranslation('settings');

  if (!toolSchema) {
    return null;
  }

  const parameters = (toolSchema.parameters as ToolParameters)?.jsonSchema.properties || {};
  const requiredParams = (toolSchema.parameters as ToolParameters)?.jsonSchema.required || [];

  return (
    <div className="mt-2 ml-4 p-3 rounded-lg bg-bolt-elements-background-depth-2 text-xs border border-bolt-elements-borderColor transition-all hover:border-bolt-elements-borderColor-hover">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-bolt-elements-textPrimary font-semibold truncate" title={toolName}>
          {toolName}
        </h3>

        <p className="text-bolt-elements-textSecondary">{toolSchema.description || t('mcpTab.noToolsAvailable')}</p>

        {Object.keys(parameters).length > 0 && (
          <div className="mt-2.5">
            <h4 className="text-bolt-elements-textSecondary font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
              Parameters:
            </h4>
            <ul className="ml-1 space-y-2">
              {Object.entries(parameters).map(([paramName, paramDetails]) => (
                <li key={paramName} className="break-words bg-bolt-elements-background-depth-3/50 p-2 rounded-md">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-bolt-elements-textPrimary">
                        {paramName}
                        {requiredParams.includes(paramName) && (
                          <span className="text-red-600 dark:text-red-400 ml-1">*</span>
                        )}
                      </span>
                      {paramDetails.type && (
                        <span className="text-bolt-elements-textSecondary italic opacity-70">
                          ({paramDetails.type})
                        </span>
                      )}
                    </div>

                    {paramDetails.description && (
                      <div className="text-bolt-elements-textSecondary leading-relaxed">{paramDetails.description}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
