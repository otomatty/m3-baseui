import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/DatePicker' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DEMO_DATE = new Date(2026, 5, 15);

export const Calendar: Story = {
  render: () => {
    const { DatePicker } = useM3();
    return (
      <div className="rounded-large bg-surface-container-high">
        <DatePicker.Calendar defaultMonth={DEMO_DATE} today={DEMO_DATE} />
      </div>
    );
  },
};

export const Docked: Story = {
  render: () => {
    const { DatePicker } = useM3();
    return (
      <DatePicker.Root>
        <DatePicker.Field>
          <DatePicker.Input placeholder="YYYY/MM/DD" aria-label="日付" />
          <DatePicker.FieldIcon aria-label="カレンダーを開く">
            <Icon name="calendar_today" size={24} />
          </DatePicker.FieldIcon>
        </DatePicker.Field>
        <DatePicker.Portal>
          <DatePicker.Positioner sideOffset={4} align="start">
            <DatePicker.Popup>
              <DatePicker.Calendar defaultMonth={DEMO_DATE} today={DEMO_DATE} />
            </DatePicker.Popup>
          </DatePicker.Positioner>
        </DatePicker.Portal>
      </DatePicker.Root>
    );
  },
};

export const Modal: Story = {
  render: () => {
    const { DatePicker, Button } = useM3();
    return (
      <DatePicker.Modal>
        <DatePicker.ModalTrigger render={<Button variant="tonal" />}>
          カレンダー（モーダル）
        </DatePicker.ModalTrigger>
        <DatePicker.ModalPortal>
          <DatePicker.ModalBackdrop />
          <DatePicker.ModalPopup>
            <DatePicker.ModalHeader>日付を選択</DatePicker.ModalHeader>
            <DatePicker.ModalHeadline>
              {new Intl.DateTimeFormat('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(DEMO_DATE)}
            </DatePicker.ModalHeadline>
            <DatePicker.Calendar defaultMonth={DEMO_DATE} today={DEMO_DATE} />
            <DatePicker.ModalActions>
              <DatePicker.ModalClose render={<Button variant="text" />}>
                キャンセル
              </DatePicker.ModalClose>
              <DatePicker.ModalClose render={<Button variant="text" />}>OK</DatePicker.ModalClose>
            </DatePicker.ModalActions>
          </DatePicker.ModalPopup>
        </DatePicker.ModalPortal>
      </DatePicker.Modal>
    );
  },
};
