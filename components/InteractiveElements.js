function InteractiveElements() {
  // Removed click-ripple effect — it screams "template"
  try {
    return (
      <div
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99990 }}
        data-name="interactive-elements"
      />
    );
  } catch (error) {
    console.error('InteractiveElements component error:', error);
    return null;
  }
}