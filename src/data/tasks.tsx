import Introduction from "@/scenes/tasks/Introduction";
import AuthenticationEnumeration from "@/scenes/tasks/AuthenticationEnumeration";
import VerboseErrors from "@/scenes/tasks/VerboseErrors";
import PasswordReset from "@/scenes/tasks/PasswordReset";
import Conclusion from "@/scenes/tasks/Conclusion";

export const tasks = [
  { id: 1, title: "Introduction", content: <Introduction /> },
  { id: 2, title: "Authentication Enumeration", content: (props: { userId: string }) => <AuthenticationEnumeration {...props} /> },
  { id: 3, title: "Enumerating Users via Verbose Errors", content: <VerboseErrors /> },
  { id: 4, title: "Exploiting Vulnerable Password Reset Logic", content: <PasswordReset /> },
  { id: 5, title: "Conclusion", content: <Conclusion /> },
];

export default tasks;
