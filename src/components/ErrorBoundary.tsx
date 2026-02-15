import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isChunkError = this.state.error?.name === 'ChunkLoadError' ||
        this.state.error?.message?.includes('Loading chunk') ||
        this.state.error?.message?.includes('dynamically imported module');

      if (isChunkError) {
        window.location.reload();
        return null;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Une erreur est survenue
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            La page n'a pas pu se charger correctement. Veuillez recharger la page.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 bg-nova-blue text-white rounded-lg hover:bg-nova-blue-dark transition-colors font-medium"
          >
            Recharger la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
