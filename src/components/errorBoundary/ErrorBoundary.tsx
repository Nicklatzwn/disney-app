import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  name: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary Component
 *
 * This component acts as a wrapper for other components, catching JavaScript errors in the child
 * component tree and rendering a fallback UI instead of crashing the application. It helps to isolate
 * errors and maintain application stability by preventing the entire app from failing due to issues in
 * a specific part of the UI.
 *
 * @component ErrorBoundary
 * @param {Props} props - The props for the component.
 * @param {ReactNode} props.children - The child components to be wrapped by the error boundary.
 * @param {string} [props.name='Error Boundary'] - The name of the wrapped segment, used in the error message.
 * @returns {JSX.Element} The error boundary or the child components, depending on the error state.
 */
class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    name: 'Error Boundary',
  };

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(/* error: Error */) {
    // The next render will show the Error UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Save information to help render Error UI
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Error UI rendering
      return (
        <div>
          <h2>{this.props.name} - Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state?.error?.toString()}
            <br />
            {this.state?.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    // Normal UI rendering
    return this.props.children;
  }
}

export default ErrorBoundary;
