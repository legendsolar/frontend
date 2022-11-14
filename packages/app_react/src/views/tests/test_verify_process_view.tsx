import VerifyProcessView from '../views/verify_process_view';
import {Typography} from '@mui/material';
import {TEST_PROCESS_ITEMS} from '../signup/tests/test_sign_up_process_bar_component';

export default () => (
    <VerifyProcessView
        leftContent={
            <div style={{width: '400px'}}>
                <Typography>Test Title</Typography>
                <Typography variant={'label' as any}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Dapibus ultrices in iaculis nunc sed augue. Ut etiam
                    sit amet nisl purus in. Venenatis urna cursus eget nunc
                    scelerisque. Morbi tempus iaculis urna id volutpat. Amet
                    risus nullam eget felis eget nunc lobortis. Auctor eu augue
                    ut lectus. Massa vitae tortor condimentum lacinia quis vel
                    eros donec ac. Quis commodo odio aenean sed adipiscing diam
                    donec. Tellus mauris a diam maecenas. Donec et odio
                    pellentesque diam volutpat commodo sed. Vel pretium lectus
                    quam id leo in vitae. Volutpat sed cras ornare arcu. Aliquam
                    faucibus purus in massa tempor nec feugiat nisl. Vitae
                    turpis massa sed elementum tempus egestas sed sed. Mi sit
                    amet mauris commodo.
                </Typography>
            </div>
        }
        processItems={TEST_PROCESS_ITEMS}
        onBackAction={() => {}}
    ></VerifyProcessView>
);
