"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

type SnackbarProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
};

export default function Snackbar({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-700 border-green-200";
      case "error":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} className="text-green-500" />;
      case "error":
        return <AlertCircle size={20} className="text-red-500" />;
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 shadow-lg rounded-lg border px-4 py-3 flex items-center gap-3 z-50 transition-all duration-300 ${getStyles()}`}
    >
      {getIcon()}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}