import { Imports } from ".";

const Register = () => {
  const { useState, useAuth, axiosClient, useNavigate } = Imports;

  const initialFormState = {
    firstName: "",
    lastName: "",
    password: "",
    emailAddress: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosClient.post("/createUser", formState, {
        withCredentials: true,
      });

      if (data) {
        setAuth(data);
        navigate("/dashboard");
        console.log({ data });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleStateChange = (e, obj) => {
    setFormState((prev) => ({ ...prev, [obj]: e }));
  };

  return (
    <div>
      <h1>Fresh Start</h1>
      <input
        placeholder="First Name"
        onChange={(e) => handleStateChange(e.target.value, "firstName")}
      />
      <input
        placeholder="Last Name"
        onChange={(e) => handleStateChange(e.target.value, "lastName")}
      />
      <input
        placeholder="Email Address"
        onChange={(e) => handleStateChange(e.target.value, "emailAddress")}
      />
      <input
        placeholder="Password"
        onChange={(e) => handleStateChange(e.target.value, "password")}
      />

      <input type="submit" onClick={(e) => createUser(e)} />
    </div>
  );
};

export default Register;
