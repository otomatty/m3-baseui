import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/ButtonGroup' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => {
    const { ButtonGroup, Button } = useM3();
    return (
      <ButtonGroup aria-label="標準のボタングループ">
        <Button variant="tonal">前へ</Button>
        <Button variant="tonal">次へ</Button>
      </ButtonGroup>
    );
  },
};

export const Connected: Story = {
  render: () => {
    const { ButtonGroup, Button } = useM3();
    return (
      <ButtonGroup variant="connected" aria-label="連結したボタングループ">
        <Button variant="tonal" startIcon={<Icon name="format_align_left" />}>
          左
        </Button>
        <Button variant="tonal" startIcon={<Icon name="format_align_center" />}>
          中央
        </Button>
        <Button variant="tonal" startIcon={<Icon name="format_align_right" />}>
          右
        </Button>
      </ButtonGroup>
    );
  },
};
