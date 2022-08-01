import React from 'react';
import PropTypes from 'prop-types';
import {Chip} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
function LivePill({error}) {
    return (
        <Chip
            size="small"
            variant="light"
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
}

LivePill.propTypes = {
    error: PropTypes.bool,
};

LivePill.defaultProps = {
    error: false,
};

export default LivePill;
