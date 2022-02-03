import { Typography, Container, Stack } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PropTypes from "prop-types";

const TransferComponent = ({ title, amount, source, destination, date }) => {
    return (
        <Container sx={{ width: "340px" }}>
            <Stack direction="row" justifyContent="space-between">
                <Typography>{title}</Typography>

                <Typography>{"$" + amount.toFixed(2)}</Typography>
            </Stack>

            <Container
                sx={{ border: 1, borderColor: "black", borderRadius: 3, p: 1 }}
            >
                <Stack
                    sx={{ height: "90px" }}
                    direction="row"
                    justifyContent="space-between"
                    alignContent="center"
                ></Stack>
            </Container>

            <Stack direction="row" justifyContent="space-between">
                <Typography>{source}</Typography>

                <Typography>{destination}</Typography>
            </Stack>
        </Container>
    );
};

// DividendComponent.propTypes = {
//     amount: PropTypes.number.isRequired,
//     source: PropTypes.string.isRequired,
//     destination: PropTypes.string.isRequired,
//     date: PropTypes.typeof(Date),
// };

export default TransferComponent;
