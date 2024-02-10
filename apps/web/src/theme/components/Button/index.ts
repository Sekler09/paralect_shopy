import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'md',
    radius: 8,
    px: 20,
    py: 4,
  },
  classNames: {
    label: classes.label,
    root: classes.root,
  },
});
