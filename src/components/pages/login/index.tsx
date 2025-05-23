import { Button } from "../../ui/Button";
import { InputBox } from "../../ui/Input";

const LoginPage = () => {
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
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
