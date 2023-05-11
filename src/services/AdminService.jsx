import axios from "axios";

async function signIn(admin) {
  const data = {
    email: admin.email,
    password: admin.password,
    returnSecureToken: true,
  };
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB769VRkyrO5hOXklG8Sc0mQUKDYU4YQus",
    data
  );
  return response;
}
export { signIn };
