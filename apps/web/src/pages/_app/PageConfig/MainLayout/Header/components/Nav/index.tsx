import { useRouter } from 'next/router';
import { FC, memo } from 'react';
import clsx from 'clsx';

import { Button, Group } from '@mantine/core';
import classes from './index.module.css';

interface NavProps {
  links: { title: string, href: string }[]
}

const Nav: FC<NavProps> = ({ links }) => {
  const router = useRouter();

  const handleNavigate = (href : string) => {
    router.push(href);
  };

  return (
    <Group gap={32}>
      {links.map(({ title, href }) => (
        <Button
          onClick={() => handleNavigate(href)}
          className={clsx(classes.link, {
            [classes.activeLink]: router.pathname === href,
          })}
        >
          {title}
        </Button>
      ))}
    </Group>
  );
};

export default memo(Nav);
