import { JSX } from "react";
import SQLInjection from "@/scenes/tasks/Injection/SQLInjection";
import CommandInjection from "@/scenes/tasks/Injection/CommandInjection";
import XSS from "@/scenes/tasks/Injection/XSS";
import Introduction from "@/scenes/tasks/Injection/Introduction";
import Conclusion from "@/scenes/tasks/Injection/Conclusion";

type Task = {
  id: string;
  title: string;
  content: (props: { userId: string }) => JSX.Element;
};

export const injectionTasks: Task[] = [
  {
    id: "1",
    title: "Introduction",
    content: ({ userId }) => <Introduction userId={userId} />,
  },
  {
    id: "2",
    title: "SQL Injection",
    content: ({ userId }) => <SQLInjection userId={userId} />,
  },
  {
    id: "3",
    title: "Command Injection",
    content: ({ userId }) => <CommandInjection userId={userId} />,
  },
  {
    id: "4",
    title: "Cross-Site Scripting (XSS)",
    content: ({ userId }) => <XSS userId={userId} />,
  },
  {
    id: "5",
    title: "Conclusion",
    content: ({ userId }) => <Conclusion userId={userId} />,
  },
];
