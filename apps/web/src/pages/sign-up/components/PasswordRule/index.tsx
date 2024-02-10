import { Group, Text } from '@mantine/core';
import { FC, memo } from 'react';
import {
  IconCircleCheck,
} from '@tabler/icons-react';

interface PasswordRuleProps {
  label: string;
  done: boolean;
}
const PasswordRule: FC<PasswordRuleProps> = ({ label, done }) => (
  <Group gap={12}>
    <IconCircleCheck color={done ? '#0bcb3e' : '#2B77EB'} />
    <Text td={done ? 'line-through' : 'none'} c="#A3A3A3">
      {label}
    </Text>
  </Group>
);

export default memo(PasswordRule);
