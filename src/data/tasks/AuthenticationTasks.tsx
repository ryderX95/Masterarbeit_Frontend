import Introduction from "@/scenes/tasks/Authentication/Introduction";
import AuthenticationEnumeration from "@/scenes/tasks/Authentication/AuthenticationEnumeration";
import PasswordReset from "@/scenes/tasks/Authentication/PasswordReset";
import VerboseErrors from "@/scenes/tasks/Authentication/VerboseErrors";
import Conclusion from "@/scenes/tasks/Authentication/Conclusion";

export const authenticationTasks = [
  {
    id: "1",
    title: "Introduction",
    content: ({ userId }: { userId: string }) => <Introduction userId={userId} />,
  },
  {
    id: "2",
    title: "Authentication Enumeration",
    content: ({ userId }: { userId: string }) => <AuthenticationEnumeration userId={userId} />,
  },
  {
    id: "3",
    title: "Password Reset Flow Vulnerabilities",
    content: ({ userId }: { userId: string }) => <PasswordReset userId={userId} />,
  },
  {
    id: "4",
    title: "Verbose Errors",
    content: ({ userId }: { userId: string }) => <VerboseErrors userId={userId} />,
  },
  {
    id: "5",
    title: "Conclusion",
    content: ({ userId }: { userId: string }) => <Conclusion userId={userId} />,
  },
];
