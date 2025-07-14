// ========================================
// FOOTER COMPONENT
// ========================================
// Component footer chứa thông tin cuối trang
// - Copyright information
// - Course branding
// - Consistent styling với header
export default function AppFooter() {
  return (
    <div style={{
      background: "#e9ecef",        // Background color
      textAlign: "center",          // Center align text
      padding: "8px 0 6px 0",       // Padding top/bottom
      fontSize: 16,                 // Font size
      color: "#444",                // Text color
      width: "100%"                 // Full width
    }}>
      {/* Footer content - Course information */}
      Khóa học Next.JS v13 Basic & Hỏi Dân IT
    </div>
  );
} 