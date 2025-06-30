import { Formik, Form, Field } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAuth } from "../../../context/authContext";
import { useLogin } from "../../../hooks/auth/useLogin";
import { Button } from "../../ui/Button";
import { InputBox } from "../../ui/Input";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginPage = () => {
  const { mutateAsync } = useLogin();
  const { login } = useAuth();

  const handleLogin = (values: { username: string; password: string }) => {
    mutateAsync(
      { username: values.username, password: values.password },
      {
        onSuccess: (data) => {
          login(data.authentication);
        },
        onError: () => {
          toast.error("Invalid username or password");
        },
      }
    );
  };

  return (
    <div className="h-dvh w-dvw flex justify-center items-center bg-muted">
      <div className="w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-md h-auto bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={toFormikValidationSchema(loginSchema)}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <Field name="username">
                {({ field }: any) => (
                  <InputBox
                    label="Username"
                    isRequired={true}
                    placeholder="username"
                    type="text"
                    {...field}
                    instruction={{
                      text: touched.username && errors.username,
                      type: "error",
                    }}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field }: any) => (
                  <InputBox
                    label="Password"
                    isRequired={true}
                    placeholder="******"
                    type="password"
                    {...field}
                    instruction={{
                      text: touched.password && errors.password,
                      type: "error",
                    }}
                  />
                )}
              </Field>

              <Button
                type="submit"
                variant="filled-primary"
                size="md"
                className="w-full"
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
