import {Stack, List, ListItemButton, Typography} from '@mui/material/';
import DocumentIcon from 'components/icons/document_icon';
import {useStorage} from 'reactfire';
import {ref, getDownloadURL} from 'firebase/storage';
import {useTheme} from '@mui/material';

const DocumentComponent = ({documents}) => {
    const theme = useTheme();

    const colorName = (documentObject) => {
        return 'color' in documentObject ? documentObject.color : 'skyBlue';
    };

    return (
        <List>
            {documents.map((documentItem, index) => (
                <ListItemButton
                    sx={{ml: -4, mr: -4, height: '62px'}}
                    key={index}
                >
                    <a
                        href={documentItem?.link ? documentItem.link : null}
                        target="_blank"
                        download
                        style={{textDecoration: 'none'}}
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
                    </a>
                </ListItemButton>
            ))}
        </List>
    );
};

export default DocumentComponent;
