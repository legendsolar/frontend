import {Stack, List, ListItemButton, Typography, Chip} from '@mui/material/';
import DocumentIcon from 'components/icons/document_icon';
import {useStorage} from 'reactfire';
import {ref, getDownloadURL} from 'firebase/storage';
import {useTheme} from '@mui/material';
import Divider from 'components/basics/divider';

const DocumentListComponent = ({documents}) => {
    const theme = useTheme();

    const colorName = (documentObject) => {
        return 'color' in documentObject ? documentObject.color : 'skyBlue';
    };

    return (
        <div>
            {documents.map((documentItem, index) => (
                <div key={index}>
                    <Stack
                        sx={{
                            width: '100%',
                            height: '86px',
                        }}
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Stack
                            sx={{
                                width: '100%',
                            }}
                            direction="row"
                            justifyContent={'flex-start'}
                        >
                            <DocumentIcon
                                color={
                                    theme.palette[colorName(documentItem)].main
                                }
                                darkColor={
                                    theme.palette[colorName(documentItem)].dark
                                }
                                width={25}
                            ></DocumentIcon>
                            <Typography variant="subtitle1">
                                {documentItem.title}
                            </Typography>
                        </Stack>

                        <Chip
                            label={'Download'}
                            color={'whiteFog'}
                            sx={{color: 'blackDawn.main'}}
                        ></Chip>
                    </Stack>

                    {index !== documents.length - 1 && <Divider></Divider>}
                </div>
            ))}
        </div>
    );
};

export default DocumentListComponent;