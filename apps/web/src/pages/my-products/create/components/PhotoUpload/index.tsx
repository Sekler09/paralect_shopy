import { Button, FileInput, Group } from '@mantine/core';
import Image from 'next/image';
import { FC, memo, useCallback, useRef, useState } from 'react';

import classes from './index.module.css';

interface PhotoUploadProps {
  onFileChange: (file : File) => void
}

const PhotoUpload: FC<PhotoUploadProps> = ({ onFileChange }) => {
  const [value, setValue] = useState<File | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const handleFileChange = useCallback((newFile: File) => {
    setValue(newFile);
    onFileChange(newFile);
  }, [onFileChange]);

  return (
    <Group gap={16}>
      <Image
        src={value ? URL.createObjectURL(value) : '/images/noImage.png'}
        alt="Photo"
        width={180}
        height={180}
        className={classes.photoImg}
        placeholder="blur"
      />
      <FileInput accept="image/png,image/jpeg,image/jpg" style={{ display: 'none' }} value={value} onChange={handleFileChange} ref={ref} />
      <Button onClick={() => ref.current?.click()} className={classes.uploadBtn}>
        Upload Photo
      </Button>
    </Group>
  );
};

export default memo(PhotoUpload);
