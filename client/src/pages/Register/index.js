import Register from "./Register";

import axiosClient from "../../lib/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Imports = {
  axiosClient,
  useAuth,
  useState,
  useNavigate,
};

export default Register;
