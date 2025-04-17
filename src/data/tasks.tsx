import Introduction from "@/scenes/tasks/Authentication/Introduction";
import AuthenticationEnumeration from "@/scenes/tasks/Authentication/AuthenticationEnumeration";
import VerboseErrors from "@/scenes/tasks/Authentication/VerboseErrors";
import PasswordReset from "@/scenes/tasks/Authentication/PasswordReset";
import Conclusion from "@/scenes/tasks/Authentication/Conclusion";

export const tasks = [
  { id: 1, title: "Introduction", content: <Introduction /> },
  { id: 2, title: "Authentication Enumeration", content: (props: { userId: string }) => <AuthenticationEnumeration {...props} /> },
  { id: 3, title: "Enumerating Users via Verbose Errors", content: <VerboseErrors /> },
  { id: 4, title: "Exploiting Vulnerable Password Reset Logic", content: <PasswordReset /> },
  { id: 5, title: "Conclusion", content: <Conclusion /> },
];

export default tasks;
