import styles from "./Button.module.css";

function Button({ children, onClickHandler = () => {}, type = null }) {
  function handleButton(e) {
    onClickHandler(e);
  }
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={(e) => handleButton(e)}
    >
      {children}
    </button>
  );
}

export default Button;
