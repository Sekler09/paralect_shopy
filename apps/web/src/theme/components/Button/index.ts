import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'md',
    bg: '#2B77EB',
    radius: 8,
    px: 20,
    py: 4,
  },
  classNames: {
    label: classes.label,
  },
});
