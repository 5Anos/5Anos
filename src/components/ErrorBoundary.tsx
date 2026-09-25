import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleControlledRecovery = () => {
    try {
      // Safe targeted cache cleanup: remove transient view/cache keys while preserving credentials
      const preserveKeys = new Set(['tic_5ano_auth_token', 'tic_5ano_current_user']);
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !preserveKeys.has(key)) {
          // Remove transient UI/navigation cache, theme caches or corrupted keys
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      sessionStorage.clear();
    } catch (e) {
      console.warn('Controlled recovery warning:', e);
    }
    window.location.reload();
  };

  private handleFullReset = () => {
    if (window.confirm('Isto irá terminar a tua sessão e repor todas as definições locais. Desejas continuar?')) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-3xl mx-auto">
              ⚠️
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-slate-900">
                Ocorreu um problema ao carregar a página
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Não te preocupes! Podes recarregar a página ou recuperar o estado temporário sem perder a tua sessão.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-100 rounded-xl text-left text-xs font-mono text-slate-700 overflow-auto max-h-32 border border-slate-200">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col gap-2.5 pt-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={this.handleReload}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors cursor-pointer shadow-xs"
                >
                  🔄 Recarregar Página
                </button>
                <button
                  onClick={this.handleControlledRecovery}
                  className="flex-1 py-3 px-4 rounded-xl border border-indigo-200 bg-indigo-50/60 text-indigo-700 hover:bg-indigo-100 font-bold text-sm transition-colors cursor-pointer"
                >
                  🛠️ Recuperar Estado
                </button>
              </div>

              <button
                onClick={this.handleFullReset}
                className="py-2 px-3 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                Terminar Sessão e Repor Tudo
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
