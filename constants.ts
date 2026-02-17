// In a real app, these would be process.env.REACT_APP_WHATSAPP_NUMBER
// We simulate the "Secure WhatsApp" requirement by not embedding it directly in HTML links until runtime generation.
export const SHOP_CONFIG = {
  WHATSAPP_NUMBER: "15551234567", // Example number
  CURRENCY_SYMBOL: "$",
  SITE_NAME: "Miarys Variedades",
};

// Supabase Configuration (Mock for the frontend demo, but structure is real)
export const SUPABASE_CONFIG = {
  URL: process.env.REACT_APP_SUPABASE_URL || "https://xyzcompany.supabase.co",
  ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJxh...",
};
