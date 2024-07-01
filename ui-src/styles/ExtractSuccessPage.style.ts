const keys = {
  extractSuccess: "extractSuccess",
  extractSuccessPrLink: "extractSuccessPrLink",
  extractSuccessGoHome: "extractSuccessGoHome",
} as const;

export default {
  extractSuccess: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: "16px",
    backgroundColor: "#F5F5F7",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    color: "#333",
  },
  extractSuccessPrLink: {
    fontSize: "16px",
    textDecoration: "none",
    color: "#007AFF",
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "#E9E9EB",
    transition: "background-color 0.3s",
  },
  extractSuccessGoHome: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#007AFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
} as Record<keyof typeof keys, React.CSSProperties>;
