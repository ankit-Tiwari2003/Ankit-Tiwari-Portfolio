'use client';

import React from 'react';

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(`[SectionErrorBoundary] ${this.props.name}:`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="c-space my-10 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400">Failed to load {this.props.name}</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
            >
              Retry
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
