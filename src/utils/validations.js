export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const validateForm = () => {
  let errors = {};
  if (!email) errors.email = "El email es requerido";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email inválido";
  if (!password) errors.password = "La contraseña es requerida";
  else if (!validatePassword(password)) {
    errors.password =
      "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }
  return errors;
};
