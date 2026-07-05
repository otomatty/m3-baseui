import { Button, Card } from '@m3-baseui/react-tailwind';

export function CardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {(['elevated', 'filled', 'outlined'] as const).map((variant) => (
        <Card key={variant} variant={variant} className="flex flex-col gap-2 p-4">
          <p className="text-title-medium capitalize">{variant}</p>
          <p className="text-body-medium text-on-surface-variant">M3 {variant} カード</p>
          <Button variant="text" className="self-start">
            詳細
          </Button>
        </Card>
      ))}
    </div>
  );
}
