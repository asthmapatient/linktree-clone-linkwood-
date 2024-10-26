import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";

const login = () => {
  return (
    <div className=" p-4 max-w-xs mx-auto flex flex-col gap-6">
      <h1 className="text-4xl text-center font-bold">Login </h1>
      <p className="text-center text-gray-500">
        Sign in to your account using one of the following methods
      </p>
      <LoginWithGoogle />
    </div>
  );
};

export default login;
