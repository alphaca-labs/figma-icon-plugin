const keys = {
  homeContainer: "homeContainer",
} as const;

export default {
  homeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f7",
    padding: "20px",
    margin: "0 auto",
  },
} as Record<keyof typeof keys, React.CSSProperties>;
