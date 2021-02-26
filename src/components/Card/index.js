import "./style.module.scss";

const Card = ({ children, hoverCheck = false, style = "" }) => {
  let hoverStyle =`wrapper ${style}`
  if (hoverCheck) {
    hoverStyle = `wrapper_hover ${style}`
  }
  return (
    <div className={hoverStyle}>
      <div>{children}</div>
    </div>
  );
};

export default Card;
