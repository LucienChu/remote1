/**
 * IRIS R&D Group Inc. All rights reserved.
 *
 * @author Lucien Chu
 * Create Date: Jul 08, 2020
 *
 * @description Login component to verify user
 */
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo/logo.png";
import { Grid } from "@material-ui/core";
import Spinner from "../../ui/spinner/Spinner";
import IrisMessagePopupDialog from "../../ui/popups/irisMessagePupupDialog.js/irisMessagePopupDialog";
import UserNamePasswordComponent from "./userNamePasswordComponent";
import styles from "./login.module.scss";
/*================================================== redux ================================================== */
import { connect } from "react-redux";
import { loginReset, startLogin } from "../../store/actioins/loginActions";
import { getLocalIrisUser } from "../../utils/localStorageUtil";

const TAG = "Login.js";

const Login = (props) => {
  const {
    history, // from react router dom
    startLogin, // from redux-store
    isLoading,
    error,
    userData,
    resetLoginState,
  } = props;

  //   const [isLoading, setIsLoading] = useState(false);
  const [disabledUserInput, setDisabledUserInput] = useState(false);

  const [userName] = useState(getLocalIrisUser().userName || "");
  const [password] = useState("");

  // dialog object is passed to dialog component,
  // so it should be form of
  // {
  //   title: string,
  //   message: String,
  // }

  const [dialogObject, setDialogObject] = useState(null);

  /*================================================== manul login ================================================== */

  const handleLogin = async (params) => {
    const { userName, password } = params;
    setDisabledUserInput(true);
    // setIsLoading(true);
    startLogin(userName, password);
  };

  /*================================================== auto login ================================================== */

  /**
   * when both user name and access token are avaiable, try to log user in
   * with these information
   */
  useEffect(() => {
    const { userName, accessToken } = getLocalIrisUser();
    if (
      userName &&
      userName !== "undefined" &&
      accessToken &&
      accessToken !== "undefined"
    ) {
      startLogin(userName, null, accessToken);
    }
  }, [startLogin]);

  /*================================================== login finished ================================================== */
  /**
   * userData is returned, navigate to home page
   */
  useEffect(() => {
    debugger;
    if (userData && userData.access.trim() !== "") {
      history.push("/users");
    }
  }, [userData, history]);

  /**
   * Error happen durinig log in, show alert dialog
   */
  useEffect(() => {
    if (error) {
      const dialogObject = { title: error.title, message: error.message };

      setDisabledUserInput(false);
      setDialogObject(dialogObject);
      debugger;
      resetLoginState();
    }
  }, [error, resetLoginState]);
  return (
    <div>
      <IrisMessagePopupDialog
        open={dialogObject !== null}
        onClose={() => setDialogObject(null)}
        dialogTitle={
          dialogObject && dialogObject.title ? dialogObject.title : ""
        }
        dialogMessage={
          dialogObject && dialogObject.message ? dialogObject.message : ""
        }
      />
      )
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.loginWrapper}>
          <div className={styles.backgroundImage}></div>
          <div className={styles.Login}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={logo}
                style={{
                  position: "relative",
                  marginBottom: "0.125rem",
                }}
                alt="IrisLogo"
                width={200}
              />
              <h3>Smart Cities Dashboard</h3>
              <h4 className={styles.IrisTitle}>R&D v1.0</h4>
            </div>

            <form style={{ padding: "0 1rem" }}>
              <UserNamePasswordComponent
                handleNext={handleLogin}
                userName={userName}
                password={password}
                disabled={disabledUserInput}
              />
            </form>
            <Grid container justify="center">
              <Grid item>
                <ul className={styles.NavList}>
                  <li>
                    <a
                      href="mailto:emilr@irisradgroup.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Help
                    </a>
                  </li>
                  &nbsp;
                  <li>
                    <a
                      href="https://www.irisradgroup.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      About Us
                    </a>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loginState } = state;

  return {
    isLoading: loginState.isLoading,
    error: loginState.error,
    userData: loginState.userData,
  };
};
// could be an object with action creator
const mapDispatchToProps = {
  startLogin: startLogin,
  resetLoginState: loginReset,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
 * Change Date: Jul 10, 2020
 *
 * Description:
 * Changed "confirmation code" into "authentication code"
 * to match the keyword sent to customer via MMS.
 */

/**
 * Change Log:
 *
 * Change Date: Oct 16, 2020
 *
 * Description: replace useContext with react-redux
 */
