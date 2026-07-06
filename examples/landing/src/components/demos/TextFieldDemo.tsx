import { TextField } from '@m3-baseui/react-tailwind';

export function TextFieldDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <TextField variant="outlined" label="メールアドレス" type="email" />
      <TextField variant="filled" label="名前" supportingText="表示名を入力" />
      <TextField
        variant="outlined"
        label="自己紹介"
        multiline
        rows={3}
        supportingText="複数行入力（textarea）"
      />
    </div>
  );
}
