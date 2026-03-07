import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/Button';
import { Card, CardContent, CardHeader } from '~/components/ui/Card';
import {
  Cpu,
  Server,
  Settings,
  ExternalLink,
  Package,
  Code,
  Database,
  CheckCircle,
  AlertCircle,
  Activity,
  Cable,
  ArrowLeft,
  Download,
  Shield,
  Globe,
  Terminal,
  Monitor,
  Wifi,
} from 'lucide-react';

// Setup Guide Component
function SetupGuide({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation('settings');

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="bg-transparent hover:bg-transparent text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-all duration-200 p-2"
          aria-label={t('localProvidersGuide.backToDashboard')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-bolt-elements-textPrimary">{t('localProvidersGuide.title')}</h2>
          <p className="text-sm text-bolt-elements-textSecondary">{t('localProvidersGuide.subtitle')}</p>
        </div>
      </div>

      {/* Hardware Requirements Overview */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 shadow-sm">
        <CardContent className="p-6 !pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bolt-elements-textPrimary">
                {t('localProvidersGuide.systemRequirements.title')}
              </h3>
              <p className="text-sm text-bolt-elements-textSecondary">
                {t('localProvidersGuide.systemRequirements.subtitle')}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-green-500" />
                <span className="font-medium text-bolt-elements-textPrimary">
                  {t('localProvidersGuide.systemRequirements.cpu')}
                </span>
              </div>
              <p className="text-bolt-elements-textSecondary">{t('localProvidersGuide.systemRequirements.cpuDesc')}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-bolt-elements-textPrimary">
                  {t('localProvidersGuide.systemRequirements.ram')}
                </span>
              </div>
              <p className="text-bolt-elements-textSecondary">{t('localProvidersGuide.systemRequirements.ramDesc')}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-bolt-elements-textPrimary">
                  {t('localProvidersGuide.systemRequirements.gpu')}
                </span>
              </div>
              <p className="text-bolt-elements-textSecondary">{t('localProvidersGuide.systemRequirements.gpuDesc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ollama Setup Section */}
      <Card className="bg-bolt-elements-background-depth-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center ring-1 ring-purple-500/30">
              <Server className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-bolt-elements-textPrimary">
                {t('localProvidersGuide.ollama.title')}
              </h3>
              <p className="text-sm text-bolt-elements-textSecondary">{t('localProvidersGuide.ollama.subtitle')}</p>
            </div>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-xs font-medium rounded-full">
              {t('localProvidersGuide.ollama.recommended')}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-bolt-elements-textPrimary flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t('localProvidersGuide.ollama.step1')}
            </h4>

            {/* Desktop App - New and Recommended */}
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-green-500" />
                <h5 className="font-medium text-green-500">{t('localProvidersGuide.ollama.desktopApp')}</h5>
              </div>
              <p className="text-sm text-bolt-elements-textSecondary mb-3">
                {t('localProvidersGuide.ollama.desktopAppDesc')}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-bolt-elements-textPrimary" />
                    <strong className="text-bolt-elements-textPrimary">macOS</strong>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 gap-2 group shadow-sm hover:shadow-lg hover:shadow-purple-500/20 font-medium"
                    _asChild
                  >
                    <a
                      href="https://ollama.com/download/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0" />
                      <span className="flex-1 text-center font-medium">
                        {t('localProvidersGuide.ollama.downloadDesktop')}
                      </span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-bolt-elements-textPrimary" />
                    <strong className="text-bolt-elements-textPrimary">Windows</strong>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 gap-2 group shadow-sm hover:shadow-lg hover:shadow-purple-500/20 font-medium"
                    _asChild
                  >
                    <a
                      href="https://ollama.com/download/windows"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0" />
                      <span className="flex-1 text-center font-medium">
                        {t('localProvidersGuide.ollama.downloadDesktop')}
                      </span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-blue-500 text-sm">
                    {t('localProvidersGuide.ollama.webInterface')}
                  </span>
                </div>
                <p className="text-xs text-bolt-elements-textSecondary">
                  {t('localProvidersGuide.ollama.webInterfaceDesc', { url: 'http://localhost:11434' })}
                </p>
              </div>
            </div>

            {/* CLI Installation */}
            <div className="p-4 rounded-lg bg-bolt-elements-background-depth-3">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-bolt-elements-textPrimary" />
                <h5 className="font-medium text-bolt-elements-textPrimary">{t('localProvidersGuide.ollama.cli')}</h5>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-bolt-elements-textPrimary" />
                    <strong className="text-bolt-elements-textPrimary">Windows</strong>
                  </div>
                  <div className="text-xs bg-bolt-elements-background-depth-4 p-2 rounded font-mono text-bolt-elements-textPrimary">
                    winget install Ollama.Ollama
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-bolt-elements-textPrimary" />
                    <strong className="text-bolt-elements-textPrimary">macOS</strong>
                  </div>
                  <div className="text-xs bg-bolt-elements-background-depth-4 p-2 rounded font-mono text-bolt-elements-textPrimary">
                    brew install ollama
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-bolt-elements-textPrimary" />
                    <strong className="text-bolt-elements-textPrimary">Linux</strong>
                  </div>
                  <div className="text-xs bg-bolt-elements-background-depth-4 p-2 rounded font-mono text-bolt-elements-textPrimary">
                    curl -fsSL https://ollama.com/install.sh | sh
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Model Recommendations */}
          <div className="space-y-4">
            <h4 className="font-medium text-bolt-elements-textPrimary flex items-center gap-2">
              <Package className="w-4 h-4" />
              {t('localProvidersGuide.models.title')}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-bolt-elements-background-depth-3">
                <h5 className="font-medium text-bolt-elements-textPrimary mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-green-500" />
                  {t('localProvidersGuide.models.codeTitle')}
                </h5>
                <div className="space-y-2 text-xs bg-bolt-elements-background-depth-4 p-3 rounded font-mono text-bolt-elements-textPrimary">
                  <div>{t('localProvidersGuide.models.codeDesc')}</div>
                  <div>ollama pull llama3.2:3b</div>
                  <div>ollama pull codellama:13b</div>
                  <div>ollama pull deepseek-coder-v2</div>
                  <div>ollama pull qwen2.5-coder:7b</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-bolt-elements-background-depth-3">
                <h5 className="font-medium text-bolt-elements-textPrimary mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  {t('localProvidersGuide.models.chatTitle')}
                </h5>
                <div className="space-y-2 text-xs bg-bolt-elements-background-depth-4 p-3 rounded font-mono text-bolt-elements-textPrimary">
                  <div>{t('localProvidersGuide.models.chatDesc')}</div>
                  <div>ollama pull llama3.2:3b</div>
                  <div>ollama pull mistral:7b</div>
                  <div>ollama pull phi3.5:3.8b</div>
                  <div>ollama pull qwen2.5:7b</div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span className="font-medium text-purple-500">
                    {t('localProvidersGuide.models.performanceOptimized')}
                  </span>
                </div>
                <ul className="text-xs text-bolt-elements-textSecondary space-y-1">
                  <li>• {t('localProvidersGuide.models.performanceList.llama')}</li>
                  <li>• {t('localProvidersGuide.models.performanceList.phi')}</li>
                  <li>• {t('localProvidersGuide.models.performanceList.qwen')}</li>
                  <li>• {t('localProvidersGuide.models.performanceList.mistral')}</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium text-yellow-500">{t('localProvidersGuide.models.proTips')}</span>
                </div>
                <ul className="text-xs text-bolt-elements-textSecondary space-y-1">
                  <li>• {t('localProvidersGuide.models.tips.performance')}</li>
                  <li>• {t('localProvidersGuide.models.tips.quantized')}</li>
                  <li>• {t('localProvidersGuide.models.tips.storage')}</li>
                  <li>• {t('localProvidersGuide.models.tips.webUi')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop App Features */}
          <div className="space-y-4">
            <h4 className="font-medium text-bolt-elements-textPrimary flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              {t('localProvidersGuide.features.title')}
            </h4>
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-blue-500 mb-3">{t('localProvidersGuide.features.uiTitle')}</h5>
                  <ul className="text-sm text-bolt-elements-textSecondary space-y-1">
                    <li>• {t('localProvidersGuide.features.uiList.library')}</li>
                    <li>• {t('localProvidersGuide.features.uiList.download')}</li>
                    <li>• {t('localProvidersGuide.features.uiList.chat')}</li>
                    <li>• {t('localProvidersGuide.features.uiList.monitoring')}</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-500 mb-3">{t('localProvidersGuide.features.mgmtTitle')}</h5>
                  <ul className="text-sm text-bolt-elements-textSecondary space-y-1">
                    <li>• {t('localProvidersGuide.features.mgmtList.updates')}</li>
                    <li>• {t('localProvidersGuide.features.mgmtList.optimization')}</li>
                    <li>• {t('localProvidersGuide.features.mgmtList.gpu')}</li>
                    <li>• {t('localProvidersGuide.features.mgmtList.crossPlatform')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="space-y-4">
            <h4 className="font-medium text-bolt-elements-textPrimary flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t('localProvidersGuide.troubleshooting.title')}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <h5 className="font-medium text-red-500 mb-2">
                  {t('localProvidersGuide.troubleshooting.commonIssues')}
                </h5>
                <ul className="text-xs text-bolt-elements-textSecondary space-y-1">
                  <li>• {t('localProvidersGuide.troubleshooting.issues.appNotStarting')}</li>
                  <li>• {t('localProvidersGuide.troubleshooting.issues.gpuNotDetected')}</li>
                  <li>• {t('localProvidersGuide.troubleshooting.issues.portBlocked')}</li>
                  <li>• {t('localProvidersGuide.troubleshooting.issues.modelsNotLoading')}</li>
                  <li>• {t('localProvidersGuide.troubleshooting.issues.slowPerformance')}</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <h5 className="font-medium text-green-500 mb-2">
                  {t('localProvidersGuide.troubleshooting.usefulCommands')}
                </h5>
                <div className="text-xs bg-bolt-elements-background-depth-4 p-3 rounded font-mono text-bolt-elements-textPrimary space-y-1">
                  <div>{t('localProvidersGuide.troubleshooting.commands.checkModels')}</div>
                  <div>ollama list</div>
                  <div></div>
                  <div>{t('localProvidersGuide.troubleshooting.commands.removeModels')}</div>
                  <div>ollama rm model_name</div>
                  <div></div>
                  <div>{t('localProvidersGuide.troubleshooting.commands.checkGpu')}</div>
                  <div>ollama ps</div>
                  <div></div>
                  <div>{t('localProvidersGuide.troubleshooting.commands.viewLogs')}</div>
                  <div>ollama logs</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LM Studio Setup Section */}
      <Card className="bg-bolt-elements-background-depth-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center ring-1 ring-blue-500/30">
              <Monitor className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-bolt-elements-textPrimary">
                {t('localProvidersGuide.lmStudio.title')}
              </h3>
              <p className="text-sm text-bolt-elements-textSecondary">{t('localProvidersGuide.lmStudio.subtitle')}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation */}
          <div className="space-y-4">
            <h4 className="font-medium text-bolt-elements-textPrimary flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t('localProvidersGuide.lmStudio.step1')}
            </h4>
            <div className="p-4 rounded-lg bg-bolt-elements-background-depth-3">
              <p className="text-sm text-bolt-elements-textSecondary mb-3">
                {t('localProvidersGuide.lmStudio.downloadDesc')}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 gap-2 group shadow-sm hover:shadow-lg hover:shadow-blue-500/20 font-medium"
                _asChild
              >
                <a
                  href="https://lmstudio.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0" />
                  <span className="flex-1 text-center font-medium">
                    {t('localProvidersGuide.lmStudio.downloadButton')}
                  </span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </a>
              </Button>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium text-bolt-elements-textPrimary flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t('localProvidersGuide.lmStudio.step2')}
            </h4>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-bolt-elements-background-depth-3">
                <h5 className="font-medium text-bolt-elements-textPrimary mb-2">
                  {t('localProvidersGuide.lmStudio.startServer')}
                </h5>
                <ol className="text-xs text-bolt-elements-textSecondary space-y-1 list-decimal list-inside">
                  <li>{t('localProvidersGuide.lmStudio.steps.download')}</li>
                  <li>{t('localProvidersGuide.lmStudio.steps.tab')}</li>
                  <li>{t('localProvidersGuide.lmStudio.steps.select')}</li>
                  <li>{t('localProvidersGuide.lmStudio.steps.port')}</li>
                  <li>{t('localProvidersGuide.lmStudio.steps.start')}</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-red-500">{t('localProvidersGuide.lmStudio.cors.title')}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-bolt-elements-textSecondary">
                    {t('localProvidersGuide.lmStudio.cors.desc')}
                  </p>
                  <ol className="text-xs text-bolt-elements-textSecondary space-y-1 list-decimal list-inside ml-2">
                    <li>{t('localProvidersGuide.lmStudio.cors.enable')}</li>
                    <li>{t('localProvidersGuide.lmStudio.cors.network')}</li>
                    <li>
                      {t('localProvidersGuide.lmStudio.cors.cli')}{' '}
                      <code className="bg-bolt-elements-background-depth-4 px-1 rounded">lms server start --cors</code>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-blue-500">{t('localProvidersGuide.lmStudio.advantages.title')}</span>
            </div>
            <ul className="text-xs text-bolt-elements-textSecondary space-y-1 list-disc list-inside">
              <li>{t('localProvidersGuide.lmStudio.advantages.list.downloader')}</li>
              <li>{t('localProvidersGuide.lmStudio.advantages.list.management')}</li>
              <li>{t('localProvidersGuide.lmStudio.advantages.list.chat')}</li>
              <li>{t('localProvidersGuide.lmStudio.advantages.list.gguf')}</li>
              <li>{t('localProvidersGuide.lmStudio.advantages.list.updates')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* LocalAI Setup Section */}
      <Card className="bg-bolt-elements-background-depth-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center ring-1 ring-green-500/30">
              <Globe className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-bolt-elements-textPrimary">
                {t('localProvidersGuide.localAi.title')}
              </h3>
              <p className="text-sm text-bolt-elements-textSecondary">{t('localProvidersGuide.localAi.subtitle')}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation */}
          <div className="space-y-4">
            <h4 className="font-medium text-bolt-elements-textPrimary flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t('localProvidersGuide.localAi.installation')}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-bolt-elements-background-depth-3">
                <h5 className="font-medium text-bolt-elements-textPrimary mb-2">
                  {t('localProvidersGuide.localAi.quickInstall')}
                </h5>
                <div className="text-xs bg-bolt-elements-background-depth-4 p-3 rounded font-mono text-bolt-elements-textPrimary space-y-1">
                  <div>{t('localProvidersGuide.localAi.oneLine')}</div>
                  <div>curl https://localai.io/install.sh | sh</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-bolt-elements-background-depth-3">
                <h5 className="font-medium text-bolt-elements-textPrimary mb-2">
                  {t('localProvidersGuide.localAi.docker')}
                </h5>
                <div className="text-xs bg-bolt-elements-background-depth-4 p-3 rounded font-mono text-bolt-elements-textPrimary space-y-1">
                  <div>docker run -p 8080:8080</div>
                  <div>quay.io/go-skynet/local-ai:latest</div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium text-bolt-elements-textPrimary flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t('localProvidersGuide.localAi.configTitle')}
            </h4>
            <div className="p-4 rounded-lg bg-bolt-elements-background-depth-3">
              <p className="text-sm text-bolt-elements-textSecondary mb-3">
                {t('localProvidersGuide.localAi.configDesc')}
              </p>
              <div className="text-xs bg-bolt-elements-background-depth-4 p-3 rounded font-mono text-bolt-elements-textPrimary space-y-1">
                <div>{t('localProvidersGuide.localAi.exampleConfig')}</div>
                <div>models:</div>
                <div>- name: llama3.1</div>
                <div>backend: llama</div>
                <div>parameters:</div>
                <div>model: llama3.1.gguf</div>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium text-green-500">{t('localProvidersGuide.localAi.advantages.title')}</span>
            </div>
            <ul className="text-xs text-bolt-elements-textSecondary space-y-1 list-disc list-inside">
              <li>{t('localProvidersGuide.localAi.advantages.list.compatibility')}</li>
              <li>{t('localProvidersGuide.localAi.advantages.list.formats')}</li>
              <li>{t('localProvidersGuide.localAi.advantages.list.docker')}</li>
              <li>{t('localProvidersGuide.localAi.advantages.list.gallery')}</li>
              <li>{t('localProvidersGuide.localAi.advantages.list.mgmt')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Performance Optimization */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bolt-elements-textPrimary">
                {t('localProvidersGuide.optimization.title')}
              </h3>
              <p className="text-sm text-bolt-elements-textSecondary">
                {t('localProvidersGuide.optimization.subtitle')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-bolt-elements-textPrimary">
                {t('localProvidersGuide.optimization.hardware')}
              </h4>
              <ul className="text-sm text-bolt-elements-textSecondary space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{t('localProvidersGuide.optimization.hardwareList.cuda')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{t('localProvidersGuide.optimization.hardwareList.ram')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{t('localProvidersGuide.optimization.hardwareList.ssd')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{t('localProvidersGuide.optimization.hardwareList.apps')}</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-bolt-elements-textPrimary">
                {t('localProvidersGuide.optimization.software')}
              </h4>
              <ul className="text-sm text-bolt-elements-textSecondary space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{t('localProvidersGuide.optimization.softwareList.smallModels')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{t('localProvidersGuide.optimization.softwareList.quantization')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{t('localProvidersGuide.optimization.softwareList.context')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{t('localProvidersGuide.optimization.softwareList.streaming')}</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Options */}
      <Card className="bg-bolt-elements-background-depth-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center ring-1 ring-orange-500/30">
              <Wifi className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-bolt-elements-textPrimary">
                {t('localProvidersGuide.alternatives.title')}
              </h3>
              <p className="text-sm text-bolt-elements-textSecondary">
                {t('localProvidersGuide.alternatives.subtitle')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-bolt-elements-textPrimary">
                {t('localProvidersGuide.alternatives.localTitle')}
              </h4>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-bolt-elements-textPrimary">Jan.ai</span>
                  </div>
                  <p className="text-xs text-bolt-elements-textSecondary">
                    {t('localProvidersGuide.alternatives.localList.jan')}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Terminal className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-bolt-elements-textPrimary">Oobabooga</span>
                  </div>
                  <p className="text-xs text-bolt-elements-textSecondary">
                    {t('localProvidersGuide.alternatives.localList.oobabooga')}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Cable className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-bolt-elements-textPrimary">KoboldAI</span>
                  </div>
                  <p className="text-xs text-bolt-elements-textSecondary">
                    {t('localProvidersGuide.alternatives.localList.kobold')}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-bolt-elements-textPrimary">
                {t('localProvidersGuide.alternatives.cloudTitle')}
              </h4>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-bolt-elements-textPrimary">OpenRouter</span>
                  </div>
                  <p className="text-xs text-bolt-elements-textSecondary">
                    {t('localProvidersGuide.alternatives.cloudList.openrouter')}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Server className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-bolt-elements-textPrimary">Together AI</span>
                  </div>
                  <p className="text-xs text-bolt-elements-textSecondary">
                    {t('localProvidersGuide.alternatives.cloudList.together')}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-bolt-elements-background-depth-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-pink-500" />
                    <span className="font-medium text-bolt-elements-textPrimary">Groq</span>
                  </div>
                  <p className="text-xs text-bolt-elements-textSecondary">
                    {t('localProvidersGuide.alternatives.cloudList.groq')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SetupGuide;
