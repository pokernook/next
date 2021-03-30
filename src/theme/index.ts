import { alpha } from "@theme-ui/color";
import { Theme } from "theme-ui";

export const theme: Theme = {
  colors: {
    background: "#fff",
    text: "#24292e",
    buttonText: "#f0f6fc",
    primary: "#2ea44f",
    secondary: "#1f71eb",
    gray: "#848d96",
    success: "#56d364",
    error: "#e83a31",
    warning: "#b8841c",
    border: "#d1d5da",
    muted: "#f7f7f7",
    textMuted: "#868e9c",
    topNav: "#f8f8fa",
    sideNav: "#f8f8fa",
    modes: {
      dark: {
        background: "#06090e",
        text: "#f0f6fc",
        buttonText: "#f0f6fc",
        primary: "#238636",
        secondary: "#1f71eb",
        gray: "#2f353d",
        success: "#56d364",
        error: "#f85249",
        warning: "#b8841c",
        border: "#2f353d",
        muted: "#0e1116",
        textMuted: "#4b5669",
        topNav: "#06090e",
        sideNav: "#06090e",
      },
    },
  },
  fonts: {
    code: "source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace",
    body:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    heading: "inherit",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 500,
  },
  styles: {
    a: {
      color: "secondary",
      fontWeight: "bold",
      textDecoration: "none",
      ":hover": {
        cursor: "pointer",
        textDecoration: "underline",
      },
    },
    hr: { borderColor: "border", borderWidth: 1, m: 0 },
    root: {
      fontFamily: "body",
      fontWeight: "body",
      fontSize: 1,
      p: 0,
      m: 0,
    },
  },
  text: {
    default: { color: "text", fontSize: 1, fontWeight: "body" },
    help: { color: "text", fontSize: 0, fontWeight: "body" },
    success: { color: "success", fontSize: 1, fontWeight: "bold" },
    danger: { color: "error", fontSize: 1, fontWeight: "bold" },
  },
  links: {
    nav: {
      display: "flex",
      alignItems: "center",
      borderRadius: 4,
      color: "text",
      textDecoration: "none",
      p: 2,
      ":hover,:focus": {
        color: "text",
        bg: alpha("secondary", 0.15),
        cursor: "pointer",
      },
      "&.active": {
        color: "buttonText",
        bg: "secondary",
      },
    },
  },
  buttons: {
    primary: {
      bg: "primary",
      color: "buttonText",
      fontWeight: "bold",
      px: 3,
      py: 2,
      ":disabled": {
        opacity: 0.8,
      },
      "&:hover": {
        cursor: "pointer",
      },
      ":active": {
        bg: "primary",
      },
    },
    secondary: {
      bg: "secondary",
      color: "buttonText",
      fontWeight: "bold",
      px: 3,
      py: 2,
      ":hover": {
        cursor: "pointer",
      },
      ":active": {
        borderColor: "border",
      },
    },
    tertiary: {
      bg: "gray",
      color: "buttonText",
      fontWeight: "bold",
      px: 3,
      py: 2,
      ":hover": {
        cursor: "pointer",
      },
      ":active": {
        borderColor: "border",
      },
    },
    danger: {
      bg: "error",
      color: "buttonText",
      fontWeight: "bold",
      px: 3,
      py: 2,
      ":hover": {
        cursor: "pointer",
      },
      ":active": {
        borderColor: "border",
      },
    },
    menu: {
      alignItems: "center",
      borderRadius: 0,
      bg: "inherit",
      color: "text",
      display: "flex",
      px: 3,
      py: 1,
      width: "100%",
      ":hover": {
        cursor: "pointer",
        color: "buttonText",
        bg: "secondary",
      },
    },
    unstyled: {
      bg: "transparent",
      border: "none",
      p: 0,
      m: 0,
      ":hover": {
        cursor: "pointer",
      },
    },
    icon: {
      ":hover": { cursor: "pointer" },
    },
    close: {
      color: "text",
      ":hover": {
        bg: alpha("border", 0.4),
        cursor: "pointer",
      },
      ":active": {
        bg: alpha("border", 0.7),
      },
    },
  },
  cards: {
    primary: {
      p: 3,
      border: "solid",
      borderColor: "border",
      borderRadius: 4,
      borderWidth: 1,
    },
    menu: {
      display: "flex",
      flexDirection: "column",
      py: 2,
      border: "solid",
      borderColor: "border",
      borderRadius: 4,
      borderWidth: 1,
      bg: "muted",
      boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.12)",
      minWidth: 300,
    },
    modal: {
      display: "flex",
      flexDirection: "column",
      bg: "muted",
      border: "solid",
      borderColor: "border",
      borderRadius: 4,
      borderWidth: 1,
      boxShadow: "0 18px 48px 0 rgba(0, 0, 0, .35)",
      minWidth: 530,
      position: "relative",
    },
  },
  alerts: {
    error: {
      bg: "muted",
      border: "solid",
      borderColor: "error",
      borderWidth: 2,
      color: "error",
      fontWeight: "body",
      p: 3,
      overflow: "hidden",
      boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.12)",
    },
    success: {
      bg: "muted",
      border: "solid",
      borderColor: "success",
      borderWidth: 2,
      color: "success",
      fontWeight: "body",
      p: 3,
      overflow: "hidden",
      boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.12)",
    },
    info: {
      bg: "muted",
      border: "solid",
      borderColor: "secondary",
      borderWidth: 2,
      color: "info",
      fontWeight: "body",
      p: 3,
      overflow: "hidden",
      boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.12)",
    },
    warning: {
      bg: "muted",
      border: "solid",
      borderColor: "warning",
      borderWidth: 2,
      color: "warning",
      fontWeight: "body",
      p: 3,
      overflow: "hidden",
      boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.12)",
    },
  },
  images: {
    avatar: {
      bg: "black",
      borderRadius: 4,
    },
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: "bold",
      mb: 2,
    },
    input: {
      p: 2,
      borderColor: "border",
      borderWidth: 2,
      outline: "none",
      ":focus": {
        borderColor: "secondary",
      },
    },
    select: {
      p: 2,
      borderColor: "border",
      borderWidth: 2,
      outline: "none",
      ":active": {
        borderColor: "secondary",
      },
    },
  },
};
