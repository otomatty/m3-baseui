import { Button } from '@m3-baseui/react-tailwind';

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="filled">Filled</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="text">Text</Button>
    </div>
  );
}
