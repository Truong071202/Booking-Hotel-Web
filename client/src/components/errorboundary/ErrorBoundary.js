// ErrorBoundary.js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị UI thay vì trang trắng rỗng
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Ghi log lỗi vào hệ thống log
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Trả về một trang phản hồi thích hợp khi có lỗi xảy ra
      return <h1>Đã xảy ra lỗi. Vui lòng thử lại sau.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
