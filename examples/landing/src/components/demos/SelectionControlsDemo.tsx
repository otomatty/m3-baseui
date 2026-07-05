import { useState } from 'react';
import { Checkbox, Radio, RadioGroup, Switch } from '@m3-baseui/react-tailwind';

export function SelectionControlsDemo() {
  const [notify, setNotify] = useState(true);
  const [agree, setAgree] = useState(false);
  const [plan, setPlan] = useState('free');

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3 text-body-large">
        <Switch checked={notify} onCheckedChange={setNotify} aria-label="通知" />
        通知を受け取る
      </label>
      <label className="flex items-center gap-3 text-body-large">
        <Checkbox checked={agree} onCheckedChange={setAgree} />
        利用規約に同意する
      </label>
      <RadioGroup
        value={plan}
        onValueChange={(value) => setPlan(String(value))}
        aria-label="プラン"
      >
        <label className="flex items-center gap-3 text-body-large">
          <Radio value="free" />
          無料
        </label>
        <label className="flex items-center gap-3 text-body-large">
          <Radio value="pro" />
          Pro
        </label>
      </RadioGroup>
    </div>
  );
}
