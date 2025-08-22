import React from 'react';

export const QRCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="5" height="5" x="3" y="3" rx="1"></rect>
    <rect width="5" height="5" x="16" y="3" rx="1"></rect>
    <rect width="5" height="5" x="3" y="16" rx="1"></rect>
    <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
    <path d="M16 21v-3a2 2 0 0 0-2-2h-3"></path>
    <path d="M3 8h2"></path>
    <path d="M8 3v2"></path>
    <path d="M16 8h2"></path>
    <path d="M8 16v2"></path>
    <path d="M13 3v2"></path>
    <path d="M13 16v2"></path>
    <path d="M8 13h2"></path>
    <path d="M16 13h2"></path>
  </svg>
);
