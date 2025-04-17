type Props = {
    userId: string;
  };
  
  const Introduction = ({ userId }: Props) => {
    return (
      <div>
        <h2>Welcome to the Authentication Room</h2>
        <p>Your User ID: {userId}</p>
      </div>
    );
  };
  
  export default Introduction;
  