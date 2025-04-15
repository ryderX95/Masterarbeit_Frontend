import { useState, ReactNode } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Define Task Type
type Task = {
  id: number;
  title: string;
  content: ReactNode | ((props: { userId: string }) => ReactNode);
};

// Define Props Type
type TaskAccordionProps = {
  userId: string;
  tasks: Task[];
  onTaskToggle: (isOpen: boolean) => void;
};

const TaskAccordion = ({ userId, tasks, onTaskToggle }: TaskAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    onTaskToggle(isOpening);
  };

  return (
    <section className="max-w-5xl mx-auto py-10 px-6 w-full">
      {tasks.map((task, index) => (
        <div key={task.id} className="border-b border-gray-600 w-full">
          <button
            className="flex justify-between w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white"
            onClick={() => handleToggle(index)}
          >
            <span>Task {task.id}: {task.title}</span>
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openIndex === index && (
            <div className="p-4 bg-gray-800 text-gray-300">
              {typeof task.content === "function" ? task.content({ userId }) : task.content}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default TaskAccordion;
