import {Button, Typography} from '@mui/material';
import DualPaneView from 'views/dual_pane_view';

import WomanPanelsSVG from 'assets/images/women_panel.svg';
import Scroller from 'components/utils/scroller';
import DefaultComponent from 'components/utils/default_component';

import {useLocation, useNavigate} from 'react-router-dom';
import {routes} from 'routes/app_router';

const TermsConditionsPage = () => {
    const navigate = useNavigate();
    return (
        <DualPaneView
            upperLeftCorner={
                <Button
                    variant="mono"
                    onClick={() => navigate(routes.CREATE_ACCOUNT)}
                >
                    Back to create account
                </Button>
            }
            leftPane={
                <DefaultComponent>
                    <Typography variant="smallHeadline">
                        Terms and Conditions
                    </Typography>

                    <Scroller sx={{height: '450px'}}>
                        <Typography variant="subtitle2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Urna condimentum mattis
                            pellentesque id nibh. Id volutpat lacus laoreet non
                            curabitur gravida. Nunc aliquet bibendum enim
                            facilisis gravida. Urna porttitor rhoncus dolor
                            purus. Condimentum mattis pellentesque id nibh
                            tortor id aliquet. Diam ut venenatis tellus in. Ac
                            tortor vitae purus faucibus ornare suspendisse sed
                            nisi lacus. Et magnis dis parturient montes. Rutrum
                            quisque non tellus orci ac auctor. In vitae turpis
                            massa sed elementum tempus. Nisl suscipit adipiscing
                            bibendum est ultricies. Quis enim lobortis
                            scelerisque fermentum dui faucibus in ornare quam.
                            Platea dictumst vestibulum rhoncus est. Vitae
                            suscipit tellus mauris a. Aenean pharetra magna ac
                            placerat. Nisl condimentum id venenatis a
                            condimentum vitae sapien pellentesque. Venenatis a
                            condimentum vitae sapien. Nibh cras pulvinar mattis
                            nunc sed blandit libero volutpat sed. Enim facilisis
                            gravida neque convallis. Congue quisque egestas diam
                            in arcu cursus euismod quis viverra. Ac odio tempor
                            orci dapibus. Quisque non tellus orci ac auctor.
                            Morbi tincidunt ornare massa eget egestas. Facilisi
                            etiam dignissim diam quis. Lectus vestibulum mattis
                            ullamcorper velit sed ullamcorper. Eu tincidunt
                            tortor aliquam nulla facilisi cras fermentum odio
                            eu. Volutpat ac tincidunt vitae semper quis lectus
                            nulla. Aenean et tortor at risus viverra adipiscing.
                            Arcu risus quis varius quam quisque. Tempus
                            imperdiet nulla malesuada pellentesque elit eget
                            gravida cum. Malesuada pellentesque elit eget
                            gravida cum. Suscipit adipiscing bibendum est
                            ultricies integer. Tristique senectus et netus et
                            malesuada. Egestas erat imperdiet sed euismod nisi
                            porta lorem mollis. Neque viverra justo nec ultrices
                            dui sapien. Tristique sollicitudin nibh sit amet
                            commodo nulla facilisi. Dui id ornare arcu odio.
                            Nunc eget lorem dolor sed viverra. Sed risus
                            ultricies tristique nulla aliquet enim tortor. Urna
                            condimentum mattis pellentesque id nibh tortor id
                            aliquet. Iaculis nunc sed augue lacus viverra vitae
                            congue eu consequat. Aliquet risus feugiat in ante
                            metus dictum at tempor commodo. Dictum varius duis
                            at consectetur lorem donec massa sapien. Adipiscing
                            tristique risus nec feugiat in fermentum posuere
                            urna. Amet volutpat consequat mauris nunc congue
                            nisi vitae suscipit tellus. Sed faucibus turpis in
                            eu. Cras adipiscing enim eu turpis egestas pretium
                            aenean. Vitae semper quis lectus nulla. Enim nec dui
                            nunc mattis. Leo duis ut diam quam nulla porttitor
                            massa. Ut enim blandit volutpat maecenas. Nisi lacus
                            sed viverra tellus in hac habitasse platea. Id nibh
                            tortor id aliquet lectus. Morbi tristique senectus
                            et netus et malesuada fames ac. Ut diam quam nulla
                            porttitor. Bibendum neque egestas congue quisque
                            egestas diam in arcu. Imperdiet sed euismod nisi
                            porta lorem mollis aliquam. Dui accumsan sit amet
                            nulla facilisi. Et tortor at risus viverra
                            adipiscing at. Quam adipiscing vitae proin sagittis
                            nisl rhoncus. Malesuada pellentesque elit eget
                            gravida. Cursus sit amet dictum sit amet. Eu
                            tincidunt tortor aliquam nulla. Ultrices sagittis
                            orci a scelerisque purus. Nunc id cursus metus
                            aliquam eleifend. Dictum fusce ut placerat orci
                            nulla pellentesque dignissim enim sit.
                        </Typography>
                    </Scroller>
                </DefaultComponent>
            }
            rightPane={<img src={WomanPanelsSVG} width="375px"></img>}
        ></DualPaneView>
    );
};

export default TermsConditionsPage;
