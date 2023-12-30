import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  function onClickBackHandler(e) {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <Button onClickHandler={onClickBackHandler} type="back">
      &larr; Back
    </Button>
  );
}

export default BackButton;
