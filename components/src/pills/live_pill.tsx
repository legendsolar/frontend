import React from 'react';
import { Chip } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
const LivePill = ({ error }: { error: string }) => {
  return (
    <Chip
      size="small"
      variant={'light' as any}
      avatar={
        <CircleIcon
          fontSize="small"
          color="action"
          style={{
            color: error ? 'red' : 'green',
            width: '10px',
            height: '10px',
          }}
        />
      }
      label={error ? 'error' : 'live'}
      sx={{
        fontFamily: 'Be Vietnam Pro',
        textTransform: 'uppercase',
        fontSize: '18px',
        fontWeight: 300,
        color: 'blackDawn.main',
      }}
    ></Chip>
  );
};

export default LivePill;
