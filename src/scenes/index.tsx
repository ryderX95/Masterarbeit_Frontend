import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { tasks } from "@/data/tasks.tsx"; // Import tasks

// Define expected props
type TaskAccordionProps = {
  userId: string; // ✅ Add userId to props
};

const TaskAccordion = ({ userId }: TaskAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-5xl mx-auto py-10 px-6 w-full">
      {tasks.map((task, index) => (
        <div key={task.id} className="border-b border-gray-600 w-full">
          <button
            className="flex justify-between w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span>Task {task.id}: {task.title}</span>
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openIndex === index && (
            <div className="p-4 bg-gray-800 text-gray-300">
              {/* ✅ Check if task.content is a function before calling it */}
              {typeof task.content === "function" ? task.content({ userId }) : task.content}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default TaskAccordion;
