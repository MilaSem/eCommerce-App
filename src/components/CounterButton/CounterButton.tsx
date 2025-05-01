interface CounterButtonProps {
  count: number;
  onClick: () => void;
}

export const CounterButton: React.FC<CounterButtonProps> = ({
  count,
  onClick,
}) => {
  return <button onClick={onClick}>count is {count}</button>;
};
