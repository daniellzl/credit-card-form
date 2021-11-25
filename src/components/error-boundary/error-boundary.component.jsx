import { Component } from "react";
import CSS from "./error-boundary.module.scss";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // invoked after error has been thrown by child component
  // no side effects are permitted
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // invoked after error has been thrown by child component
  // side effects are permitted
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className={CSS.errorBoundary}>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
