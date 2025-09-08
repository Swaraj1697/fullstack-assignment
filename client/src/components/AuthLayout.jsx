export default function AuthLayout({ children }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f9f9f9",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "30px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
  