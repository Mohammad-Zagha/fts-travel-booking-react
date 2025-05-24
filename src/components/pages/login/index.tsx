import { useAuth } from "../../../context/authContext";
import { useLogin } from "../../../hooks/auth/useLogin";
import { Button } from "../../ui/Button";
import { InputBox } from "../../ui/Input";

const LoginPage = () => {
  const { mutate } = useLogin();
  const { login } = useAuth();

  const handleLogin = (username: string, password: string) => {
    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          login(data.authentication);
        },
      }
    );
  };
  return (
    <div className="h-dvh w-dvw flex justify-center items-center bg-muted">
      <div className="w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-md h-auto bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-4">
          <InputBox
            label="Username"
            isRequired={true}
            placeholder="username"
            type="text"
          />
          <InputBox
            label="Password"
            isRequired={true}
            placeholder="******"
            type="password"
          />
          <Button
            type="submit"
            variant="filled-primary"
            size={"md"}
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              handleLogin("user", "user");
            }}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
