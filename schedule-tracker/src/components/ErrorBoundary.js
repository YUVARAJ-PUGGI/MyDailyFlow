import React from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
    
    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '48px',
            maxWidth: '600px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>😔</div>
            
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Oops! Something went wrong
            </h1>
            
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '32px'
            }}>
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                background: '#f9fafb',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: '#dc2626',
                  marginBottom: '12px'
                }}>
                  Error Details (Development Mode)
                </summary>
                <pre style={{
                  fontSize: '12px',
                  color: '#374151',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap'
                }}>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '2px solid #e5e7eb',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
