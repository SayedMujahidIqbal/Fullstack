import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button, Container } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant="contained" color="error">
          cancel
        </Button>
      </div>
    </Container>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
