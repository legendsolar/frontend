import { useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

const tAndCString = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed viverra ipsum nunc aliquet bibendum. Sem nulla pharetra diam sit amet nisl. Elit at imperdiet dui accumsan. Enim diam vulputate ut pharetra sit amet. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Aliquet sagittis id consectetur purus ut faucibus. Non diam phasellus vestibulum lorem sed risus ultricies. Nisi scelerisque eu ultrices vitae auctor eu augue. Arcu non odio euismod lacinia at. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Varius morbi enim nunc faucibus. Justo donec enim diam vulputate ut. Amet consectetur adipiscing elit pellentesque. Amet nisl purus in mollis nunc sed. Eget nullam non nisi est. Porttitor eget dolor morbi non arcu risus.

Consectetur a erat nam at lectus urna duis convallis. Donec pretium vulputate sapien nec sagittis aliquam malesuada. Tincidunt ornare massa eget egestas purus. Ornare aenean euismod elementum nisi quis eleifend quam. Parturient montes nascetur ridiculus mus mauris. Platea dictumst vestibulum rhoncus est pellentesque. Eu scelerisque felis imperdiet proin. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Tortor id aliquet lectus proin nibh. Ipsum faucibus vitae aliquet nec ullamcorper.

Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Egestas integer eget aliquet nibh. Elementum eu facilisis sed odio morbi quis. Eleifend mi in nulla posuere. Pellentesque nec nam aliquam sem. Non quam lacus suspendisse faucibus interdum. At tempor commodo ullamcorper a lacus. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. Congue nisi vitae suscipit tellus mauris. Ac felis donec et odio pellentesque. Facilisi cras fermentum odio eu feugiat pretium. Quis eleifend quam adipiscing vitae proin sagittis nisl. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis.

Sollicitudin aliquam ultrices sagittis orci a scelerisque. Pretium lectus quam id leo. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Lacus luctus accumsan tortor posuere ac ut consequat. Quam nulla porttitor massa id. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Fermentum odio eu feugiat pretium nibh. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Faucibus ornare suspendisse sed nisi lacus sed. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Morbi tempus iaculis urna id volutpat lacus laoreet. Iaculis eu non diam phasellus vestibulum lorem sed. Duis tristique sollicitudin nibh sit amet commodo nulla. Nunc mi ipsum faucibus vitae.

Vitae suscipit tellus mauris a diam maecenas sed enim. Magna fringilla urna porttitor rhoncus dolor purus non. Morbi enim nunc faucibus a pellentesque. Interdum consectetur libero id faucibus. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Id ornare arcu odio ut sem nulla pharetra diam. Viverra suspendisse potenti nullam ac tortor vitae. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan. Nec nam aliquam sem et tortor consequat id porta nibh. Sagittis orci a scelerisque purus. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Nunc non blandit massa enim.

At urna condimentum mattis pellentesque id nibh tortor. Nisi porta lorem mollis aliquam ut porttitor. Aliquet sagittis id consectetur purus ut faucibus pulvinar. Ac orci phasellus egestas tellus rutrum. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in. Blandit cursus risus at ultrices mi. Nunc consequat interdum varius sit amet mattis vulputate enim. Nunc pulvinar sapien et ligula. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Lacus viverra vitae congue eu consequat ac felis donec et. Magna ac placerat vestibulum lectus mauris. Praesent tristique magna sit amet. Massa vitae tortor condimentum lacinia. Vitae nunc sed velit dignissim sodales. Aenean euismod elementum nisi quis. Enim nec dui nunc mattis enim ut. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant.

Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Non curabitur gravida arcu ac tortor dignissim convallis. Eu nisl nunc mi ipsum faucibus vitae. Scelerisque purus semper eget duis at tellus at. Tortor at risus viverra adipiscing at in. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. At ultrices mi tempus imperdiet nulla malesuada. Tempor commodo ullamcorper a lacus. Ac tortor dignissim convallis aenean et. Odio aenean sed adipiscing diam donec adipiscing tristique. Potenti nullam ac tortor vitae purus faucibus ornare. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Ac tortor dignissim convallis aenean et tortor at risus viverra. Aliquam vestibulum morbi blandit cursus risus at ultrices. Eu sem integer vitae justo eget magna.

Et leo duis ut diam quam nulla porttitor massa id. Sodales ut eu sem integer vitae justo. In hendrerit gravida rutrum quisque non tellus orci. Massa vitae tortor condimentum lacinia. Commodo elit at imperdiet dui accumsan sit amet nulla. Rutrum tellus pellentesque eu tincidunt. Faucibus a pellentesque sit amet porttitor eget dolor. Id nibh tortor id aliquet lectus proin. In fermentum et sollicitudin ac orci. Lobortis feugiat vivamus at augue. Aliquam ut porttitor leo a. Sem integer vitae justo eget magna.

Facilisi nullam vehicula ipsum a arcu cursus vitae. Ultrices dui sapien eget mi. Sit amet porttitor eget dolor morbi non. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum a. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales. Felis bibendum ut tristique et egestas quis. Penatibus et magnis dis parturient montes nascetur. Morbi tristique senectus et netus. Tincidunt eget nullam non nisi est sit amet facilisis magna. Vel pharetra vel turpis nunc eget lorem. Ut morbi tincidunt augue interdum velit euismod.

Id venenatis a condimentum vitae sapien. Sit amet est placerat in. Morbi non arcu risus quis. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Elit pellentesque habitant morbi tristique senectus et. Aliquam sem fringilla ut morbi tincidunt. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Eu ultrices vitae auctor eu augue. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Lacus viverra vitae congue eu consequat ac felis donec et. In mollis nunc sed id semper risus in hendrerit. Ut tortor pretium viverra suspendisse potenti. Habitant morbi tristique senectus et netus et. Odio euismod lacinia at quis risus sed vulputate odio. Vel pharetra vel turpis nunc. Phasellus faucibus scelerisque eleifend donec pretium.
`;

const ScrollBottomToComplete = ({ onComplete }) => {
    const [completeScroll, setCompleteScroll] = useState(false);

    const onScroll = (event) => {
        const target = event.target;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            setCompleteScroll(true);
        }
    };

    return (
        <Stack>
            <Box onScroll={onScroll} sx={{ overflow: "auto", height: "900px" }}>
                <Typography>{tAndCString}</Typography>
            </Box>
            <Button
                variant="primary"
                disabled={!completeScroll}
                onClick={onComplete}
            >
                Agree
            </Button>

            <Typography variant="smallLabel">
                Scroll to bottom & review to continue
            </Typography>
        </Stack>
    );
};

export default ScrollBottomToComplete;
