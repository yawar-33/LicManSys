import { Button, Col, InputField, Row, getItem, setItem } from "@/components";
import { themesSetting } from "@/recoil";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { withRouter } from "next/router";

const defaultValue = {
  username: "",
  password: "",
  isadmin: ""
};

const Login = (props: any) => {
  const setTheme = useSetRecoilState(themesSetting);
  useEffect(() => {
    if (getItem("userdata").token !== undefined) {
      props.router.push("/dashboard");
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
    props.router.push("/dashboard");
    setItem("userdata", {
      userid: data.username,
      username: data.username,
      token: 12341212,
      isadmin: data.isadmin
    });
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
              placeholder="Yawar Userid"
            />
            <InputField
              label="Password"
              name="password"
              type="text"
              register={register("password")}
              placeholder="Yawar Password"
              iconFormGroup={password ? "fas fa-eye-slash" : "fas fa-eye"}
              customeCss={password ? "password-hide-css" : ""}
              btnAction={() => setPassword(!password)}
              formGroup
              errors={errors?.password}
            />
            <InputField
              label="Is Admin"
              name="isadmin"
              type="text"
              placeholder="Yes or No"
              register={register("isadmin")}
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
    </div>
  );
};

export default withRouter(Login);
