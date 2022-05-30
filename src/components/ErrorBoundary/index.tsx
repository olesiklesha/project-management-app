import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from '../../pages';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorInfo: ErrorInfo | null;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorInfo: null,
    error: null,
  };

  public static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo): State {
    return { hasError: true, errorInfo, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  goBack() {
    this.setState({ hasError: false });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} goBack={this.goBack.bind(this)} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
