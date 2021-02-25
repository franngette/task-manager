import style from "./style.module.scss";

export default function Button({
  type,
  variant,
  children,
  onClick,
  disabled = false,
}) {
  let color = style.default;
  switch (variant) {
    case "dark":
      color = style.dark;
      break;
    case "blue":
      color = style.blue;
      break;
    case "medium":
      color = style.medium;
      break;
    case "light":
      color = style.light;
      break;
    case "outline":
      color = style.outline;
      break;
    default:
      color = style.default;
  }

  return (
    <button
      disabled={disabled ? disabled : false}
      className={color}
      id={style.button}
      type={type}
      onClick={onClick}
    >
      <div className={style.buttonContent}>{children}</div>
    </button>
  );
}
