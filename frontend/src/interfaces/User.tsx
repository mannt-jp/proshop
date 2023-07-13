export default interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const isUser = (arg: any): arg is User => {
  return (
    arg &&
    arg.name &&
    arg.email &&
    arg.password &&
    arg.isAdmin &&
    typeof arg.name === "string" &&
    typeof arg.email === "string" &&
    typeof arg.password === "string" &&
    typeof arg.isAdmin === "boolean"
  );
};
