/**
 * IRIS R&D Group Inc. All rights reserved.
 *
 * @author Lucien Chu
 * Create Date: Jul 08, 2020
 *
 * @description A component for user to input his user name and password
 */

import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";

import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const USER_NAME_TEXTFIEL_ID = "userNameTextField";
const PASSWORD_TEXTFIELD_ID = "passwordTextField";
export default function UserNamePasswordStep(props) {
  const [userName, setUserName] = useState(props.userName || "");
  const [password, setPassword] = useState(props.password || "");

  const passwordInputRef = useRef();

  const { disabled } = props;
  useEffect(() => {
    const { userName, password } = props;
    setUserName(userName || "");
    setPassword(password || "");
  }, [props.userName, props.password]);

  /**
   * @summary callback method of onKeyPress
   *
   * @description
   * when user name textfield is focused and
   * "Enter" key is prssed, the password field should be focused
   * automatically;
   * when the password textfield was the one was focused, it login
   * process should be executed.
   *
   * @param {Event} event
   */
  const handleKeyPress = (event) => {
    if (event.key.toLowerCase() === "enter") {
      if (event.target.id === USER_NAME_TEXTFIEL_ID) {
        passwordInputRef.current.focus();
      } else if (userName !== "" && password.length >= 8) {
        props.handleNext({
          userName: userName,
          password: password,
        });
      }
    }
  };

  return (
    <div>
      <TextField
        id={USER_NAME_TEXTFIEL_ID}
        autoFocus={userName === ""}
        name="User Name"
        label="User Name"
        fullWidth
        margin="normal"
        inputProps={{
          style: {
            fontSize: "1.25rem",
          },
        }}
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        onKeyPress={(event) => handleKeyPress(event)}
        disabled={disabled}
      />

      <TextField
        inputRef={passwordInputRef}
        id={PASSWORD_TEXTFIELD_ID}
        name="password"
        // autoFocus={password !== ""}
        // autoFocus={password !== ""}
        autoFocus={userName !== ""}
        label="Password"
        onKeyPress={(event) => handleKeyPress(event)}
        value={password}
        fullWidth
        type="password"
        autoComplete="current-password"
        margin="normal"
        inputProps={{
          style: {
            fontSize: "1.25rem",
          },
        }}
        onChange={(event) => setPassword(event.target.value)}
        disabled={disabled}
      />
      <Grid container justify="flex-end" style={{ paddingTop: "2rem" }}>
        <Grid item>
          <Button
            // style={{ alignSelf: "center", padding: "3px 20px" }}
            disabled={password.length < 8 || disabled}
            variant="contained"
            color="primary"
            onClick={() =>
              props.handleNext({
                userName: userName,
                password: password,
              })
            }
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

UserNamePasswordStep.propTypes = {
  userName: PropTypes.string, // user name passed from parent component
  password: PropTypes.string, // password passed from parent component
  isLoading: PropTypes.bool, // determined whether the TextFields and the login button should be disabld
  handleNext: PropTypes.func.isRequired, // call back method that uses user name and password to process log in
};

/**
 * Change Log:
 *
 * Change Date: Jul 08, 2020
 *
 * @description
 * added documentation
 */

/**
 * Change Log:
 *
 * Change Date: Aug 20, 2020
 *
 * Description:
 * 1. added PropTypes for element
 * 2. password textfield would be focuse when "Enter" is pressed while user name textfield is focused
 */
