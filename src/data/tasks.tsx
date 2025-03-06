import Introduction from "@/scenes/tasks/Introduction";
import AuthenticationEnumeration from "@/scenes/tasks/AuthenticationEnumeration";
import VerboseErrors from "@/scenes/tasks/VerboseErrors";
import PasswordReset from "@/scenes/tasks/PasswordReset";
import BasicAuth from "@/scenes/tasks/BasicAuth";
import OSINT from "@/scenes/tasks/OSINT";
import Conclusion from "@/scenes/tasks/Conclusion";

export const tasks = [
  { id: 1, title: "Introduction", content: <Introduction /> },
  { id: 2, title: "Authentication Enumeration", content: <AuthenticationEnumeration /> },
  { id: 3, title: "Enumerating Users via Verbose Errors", content: <VerboseErrors /> },
  { id: 4, title: "Exploiting Vulnerable Password Reset Logic", content: <PasswordReset /> },
  { id: 5, title: "Exploiting HTTP Basic Authentication", content: <BasicAuth /> },
  { id: 6, title: "OSINT", content: <OSINT /> },
  { id: 7, title: "Conclusion", content: <Conclusion /> },
];

export default tasks;