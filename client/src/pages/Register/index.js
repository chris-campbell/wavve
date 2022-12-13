import Register from "./Register";

import axiosClient from "../../lib/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export const Imports = {
  axiosClient,
  useAuth,
  useState,
};

export default Register;
