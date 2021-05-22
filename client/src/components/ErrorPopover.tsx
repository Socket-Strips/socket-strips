interface Props {
  error: string | undefined;
}

export default function ErrorPopover({ error }: Props) {
  if (!error) {
    return null;
  }

  return (
    <div className="bg-gray-600 text-white py-2 px-4 rounded-md">{error}</div>
  );
}
