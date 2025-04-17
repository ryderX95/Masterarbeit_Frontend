import Challenges from "@/scenes/challenges";
import { authenticationTasks } from "@/data/tasks/AuthenticationTasks";

const AuthenticationRoom = () => {
  return <Challenges tasks={authenticationTasks} title="Authentication" />;
};

export default AuthenticationRoom;
