import DefaultComponent from 'components/utils/default_component';
import DualPaneView from 'views/dual_pane_view';
import WomanPanelsSVG from 'assets/images/women_panel.svg';
import LegendsTypemark from 'assets/logos/typemark_dark.png';
import LegendsTypemarkSVG from 'assets/logos/typemark_dark.svg';
import PanelInfinitySVG from 'assets/images/panel_infinity.svg';
import {Typography} from '@mui/material';

const TestDualPaneView = () => {
    return (
        <DualPaneView
            leftPane={
                <div style={{width: '400px'}}>
                    <Typography>Test Title</Typography>
                    <Typography variant="label">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Dapibus ultrices in iaculis nunc sed
                        augue. Ut etiam sit amet nisl purus in. Venenatis urna
                        cursus eget nunc scelerisque. Morbi tempus iaculis urna
                        id volutpat. Amet risus nullam eget felis eget nunc
                        lobortis. Auctor eu augue ut lectus. Massa vitae tortor
                        condimentum lacinia quis vel eros donec ac. Quis commodo
                        odio aenean sed adipiscing diam donec. Tellus mauris a
                        diam maecenas. Donec et odio pellentesque diam volutpat
                        commodo sed. Vel pretium lectus quam id leo in vitae.
                        Volutpat sed cras ornare arcu. Aliquam faucibus purus in
                        massa tempor nec feugiat nisl. Vitae turpis massa sed
                        elementum tempus egestas sed sed. Mi sit amet mauris
                        commodo.
                    </Typography>
                </div>
            }
            rightPane={<img src={PanelInfinitySVG} width="375px"></img>}
            upperLeftCorner={
                <Typography variant="label">Test Upper Left</Typography>
            }
            lowerRightCorner={<img src={LegendsTypemarkSVG}></img>}
        ></DualPaneView>
    );
};

export default TestDualPaneView;
