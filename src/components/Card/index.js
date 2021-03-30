import "./style.scss";
import "../../styles/status.scss";

const Card = ({ children, hoverCheck = false, style = "" }) => {
  let hoverStyle = `wrapper ${style}`;
  if (hoverCheck) {
    hoverStyle = `wrapper_hover ${style}`;
  }
  return (
    <div className={hoverStyle}>
      <>{children}</>
    </div>
  );
};

export default Card;
