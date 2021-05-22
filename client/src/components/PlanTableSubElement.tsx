interface Props {
  title: string;
  message: string;
}

export default function PlanTableSubElement({ title, message }: Props) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <span>{message}</span>
    </div>
  );
}
