import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/TextField' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => {
    const { TextField } = useM3();
    return (
      <div className="flex flex-wrap gap-4">
        <TextField label="名前" supportingText="姓と名" />
        <TextField variant="outlined" label="メール" leadingIcon={<Icon name="mail" size={20} />} />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const { TextField } = useM3();
    return (
      <div className="flex flex-wrap gap-4">
        <TextField
          label="ユーザー名"
          defaultValue="taro"
          showCounter
          maxLength={20}
          trailingIcon={<Icon name="person" size={20} />}
        />
        <TextField variant="outlined" label="パスワード" error supportingText="必須項目です" />
        <TextField label="無効" defaultValue="編集不可" disabled />
      </div>
    );
  },
};
