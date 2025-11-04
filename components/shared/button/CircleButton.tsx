"use client";
import React from "react";
import styles from "./CircleButton.module.css";

interface CircleButtonProps {
  title?: string | React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  customStyles?: {
    buttonWrapper?: React.CSSProperties;
    innerContent?: React.CSSProperties;
    text?: React.CSSProperties;
  };
}

export default function CircleButton({
  title,
  disabled = false,
  onClick,
  customStyles = {},
  fullWidth = false,
}: CircleButtonProps) {
  return (
    <div
      className={`flex justify-start items-center ${
        fullWidth ? "w-full" : "w-auto"
      }`}
    >
      <button
        disabled={disabled}
        onClick={onClick}
        className={styles.buttonWrapper}
        style={{
          ...customStyles?.buttonWrapper,
          ...(fullWidth && { width: "100%" }),
        }}
      >
        <div
          className={styles.innerContent}
          style={{ ...customStyles?.innerContent }}
        >
          <p className={styles.text} style={{ ...customStyles?.text }}>
            {title}
          </p>
        </div>
      </button>
    </div>
  );
}
