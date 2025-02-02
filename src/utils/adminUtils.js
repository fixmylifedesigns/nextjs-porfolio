// src/utils/adminUtils.js

export const isAdmin = (user) => {
  if (!user || !user.email) return false;

  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
  return adminEmails.includes(user.email.toLowerCase());
};
