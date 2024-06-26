import { Button, Col, InputField, Row, getItem, setItem } from "@/components";
import { themesSetting } from "@/recoil";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { withRouter } from "next/router";
import { getBasicAuthToken } from "@/components/utils/authHelper";
import apiCall from "@/components/utils/apiservice";
import Alert from "@/components/themes/Alerts";

const defaultValue = {
  username: "",
  password: "",
  isadmin: ""
};

const Login = (props: any) => {
  const setTheme = useSetRecoilState(themesSetting);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (getItem("userdata").isValidated !== undefined) {
      if (getItem("userdata").isValidated) {
        props.router.push("/dashboard");
      }
    }
    setTheme({
      header: false,
      sidebar: false,
      footer: false,
      content: true
    });
    return () => {
      setTheme({
        header: true,
        sidebar: true,
        footer: true,
        content: true
      });
    };
  }, [props.router, setTheme]);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValue
  });
  const [password, setPassword] = useState(true);

  const onSubmit = async (data: any) => {

    const token = await getBasicAuthToken(data.username, data.password); // Generate the token

    console.log('token generate ', token)

    if (token) {
      apiCall('POST', 'admin/login', null).then((result) => {
        if (result.isValidated) {
          props.router.push("/dashboard");
          setItem("userdata", {
            username: data.username,
            isadmin: result?.roleId === 1 ? 'yes' : 'no',
            ...result,
          });
        } else {
          console.log('Login is failed')
          setErrorMessage('Login is failed');

        }
      }).catch((err) => console.log('having err while login'))

    } else {
      console.log('Token is not generated')
    }
    // props.router.push("/dashboard");
    // if (data.username === 'admin') {
    //   setItem("userdata", {
    //     userid: data.username,
    //     username: data.username,
    //     token: 12341212,
    //     isadmin: 'yes'
    //   });
    // } else {
    //   setItem("userdata", {
    //     userid: data.username,
    //     username: data.username,
    //     token: 12341212,
    //     isadmin: 'no'
    //   });
    // }
  };

  return (
    <div className="login-box container" style={{ marginTop: "10%" }}>
      <div className="card card-outline card-primary">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="login-box-msg">Sign in to start your session</p>
            <InputField
              label="Username"
              name="username"
              type="text"
              register={register("username")}
              iconFormGroup="fas fa-envelope"
              formGroup
              errors={errors?.username}
              placeholder="Userid"
            />
            <InputField
              label="Password"
              name="password"
              type="text"
              register={register("password")}
              placeholder="Password"
              iconFormGroup={password ? "fas fa-eye-slash" : "fas fa-eye"}
              customeCss={password ? "password-hide-css" : ""}
              btnAction={() => setPassword(!password)}
              formGroup
              errors={errors?.password}
            />

            <Row>
              <Col size="12">
                <Button
                  loading
                  disabled={!isDirty || !isValid}
                  textLoading="Waiting"
                  type="submit"
                  color="primary"
                  block
                  title="Sign In"
                />
              </Col>
            </Row>
          </form>
        </div>
      </div>
      {errorMessage && <Alert message={errorMessage} type="danger" />}

    </div>
  );
};

export default withRouter(Login);
