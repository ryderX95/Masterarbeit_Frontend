import Challenges from "@/scenes/challenges";
import { injectionTasks } from "@/data/tasks/InjectionTasks";

const InjectionRoom = () => {
  return <Challenges tasks={injectionTasks} title="Injection Attacks" />;
};

export default InjectionRoom;
