import styles from "./style.module.scss";

const Card = ({ children, hoverCheck = false, style = "" }) => {
  let hoverStyle = [styles.wrapper, style] //`${style.wrapper} ${style}`;
  if (hoverCheck) {
    hoverStyle = [styles.wrapper_hover, style] //`${style.wrapper} ${style}`;
  }
  return (
    <div className={hoverStyle.join(' ')}>
      <div>{children}</div>
    </div>
  );
};

export default Card;
