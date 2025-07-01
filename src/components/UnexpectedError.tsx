import { motion } from "framer-motion";
const UnexpectedError = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "var(--color-muted)",
        color: "var(--color-black)",
        textAlign: "center",
      }}
      role="alert"
      aria-live="assertive"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
        width={96}
        height={96}
        style={{ marginBottom: "1.5rem" }}
      >
        <circle cx={12} cy={12} r={10} />
        <line x1={12} y1={8} x2={12} y2={12} />
        <line x1={12} y1={16} x2={12.01} y2={16} />
      </svg>

      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "0.5rem",
          color: "var(--color-primary)",
        }}
      >
        Oops! Something went wrong.
      </h1>

      <p
        style={{
          maxWidth: 400,
          marginBottom: "1.5rem",
          fontSize: "1.125rem",
          color: "var(--color-secondary)",
          lineHeight: 1.5,
        }}
      >
        An unexpected error occurred. Please try reloading the page.
      </p>

      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
          border: "none",
          padding: "0.75rem 2rem",
          borderRadius: 8,
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(6, 128, 141, 0.4)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "var(--color-secondary)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "var(--color-primary)";
        }}
      >
        Reload Page
      </button>
    </motion.div>
  );
};

export default UnexpectedError;
