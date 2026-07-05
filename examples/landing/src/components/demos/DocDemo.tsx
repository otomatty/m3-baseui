import type { ComponentType } from 'react';
import { DemoProvider } from './DemoProvider';
import { ButtonDemo } from './ButtonDemo';
import { CardDemo } from './CardDemo';
import { ChipDemo } from './ChipDemo';
import { SelectionControlsDemo } from './SelectionControlsDemo';
import { TextFieldDemo } from './TextFieldDemo';

const DEMOS: Record<string, ComponentType> = {
  button: ButtonDemo,
  textfield: TextFieldDemo,
  'selection-controls': SelectionControlsDemo,
  chip: ChipDemo,
  card: CardDemo,
};

interface DocDemoProps {
  demoId: string;
}

export function DocDemo({ demoId }: DocDemoProps) {
  const Demo = DEMOS[demoId];
  if (!Demo) return null;

  return (
    <DemoProvider>
      <Demo />
    </DemoProvider>
  );
}
