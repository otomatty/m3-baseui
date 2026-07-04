import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';

const meta = { title: 'Components/TimePicker' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Dial: Story = {
  render: () => {
    const { TimePicker } = useM3();
    return <TimePicker variant="dial" defaultValue={{ hour: 10, minute: 30 }} />;
  },
};

export const Input: Story = {
  render: () => {
    const { TimePicker } = useM3();
    return <TimePicker variant="input" defaultValue={{ hour: 14, minute: 45 }} />;
  },
};
