import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Selection controls' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Switches: Story = {
  render: () => {
    const { Switch } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-4">
        <Switch defaultChecked aria-label="Wi-Fi" />
        <Switch aria-label="Bluetooth" />
        <Switch disabled defaultChecked aria-label="機内モード（無効・選択）" />
        <Switch disabled aria-label="無効・未選択" />
        <Switch
          defaultChecked
          aria-label="アイコン付き"
          icons={{
            checked: <Icon name="check" size={16} />,
            unchecked: <Icon name="close" size={16} />,
          }}
        />
      </div>
    );
  },
};

export const Checkboxes: Story = {
  render: () => {
    const { Checkbox } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-8">
        <label className="flex items-center gap-2 text-body-medium">
          <Checkbox defaultChecked /> Checked
        </label>
        <label className="flex items-center gap-2 text-body-medium">
          <Checkbox /> Unchecked
        </label>
        <label className="flex items-center gap-2 text-body-medium">
          <Checkbox indeterminate /> Indeterminate
        </label>
        <label className="flex items-center gap-2 text-body-medium">
          <Checkbox error /> Error
        </label>
        <label className="flex items-center gap-2 text-body-medium text-on-surface-variant">
          <Checkbox disabled defaultChecked /> Disabled
        </label>
      </div>
    );
  },
};

export const Radios: Story = {
  render: () => {
    const { Radio, RadioGroup } = useM3();
    return (
      <RadioGroup defaultValue="a">
        <label className="flex items-center gap-2 text-body-medium">
          <Radio value="a" /> オプション A
        </label>
        <label className="flex items-center gap-2 text-body-medium">
          <Radio value="b" /> オプション B
        </label>
        <label className="flex items-center gap-2 text-body-medium">
          <Radio value="c" error /> エラー
        </label>
        <label className="flex items-center gap-2 text-body-medium text-on-surface-variant">
          <Radio value="d" disabled /> 無効
        </label>
      </RadioGroup>
    );
  },
};
