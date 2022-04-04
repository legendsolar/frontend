import { Box, Typography, Container, Stack } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PropTypes from "prop-types";

const TransactionComponent = ({ title, amount, source, destination, date }) => {
    const amountString = () => {
        try {
            return amount.toFixed(2);
        } catch {
            return amount;
        }
    };
    return (
        <Container sx={{ width: "340px" }}>
            <Stack direction="row" justifyContent="space-between" sx={{ m: 1 }}>
                <Typography variant="label">{title}</Typography>

                <Typography variant="label">{"$" + amountString()}</Typography>
            </Stack>

            <Container
                sx={{
                    height: "90px",
                    borderRadius: 3,
                    position: "relative",
                    backgroundColor: "#F4F5F5",
                }}
                style={{ overflow: "hidden" }}
            >
                <div
                    style={{
                        position: "absolute",
                        transform: "translate(-25%,-25%) rotate(45deg) ",
                        width: "180px",
                        height: "180px",
                        backgroundColor: "#EBEBEB",
                    }}
                ></div>

                <Stack
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{
                        height: "100%",
                        position: "absolute",
                        left: "0",
                        right: "0",
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent={"center"}
                        alignItems="center"
                        sx={{ width: "50%" }}
                    >
                        <AccountBalanceIcon
                            sx={{
                                fontSize: "32px",
                                color: "blackDusk.main",
                            }}
                        ></AccountBalanceIcon>
                    </Box>

                    <Box
                        display="flex"
                        justifyContent={"center"}
                        alignItems="center"
                        sx={{ width: "50%" }}
                    >
                        <WbSunnyIcon
                            sx={{
                                fontSize: "32px",
                                color: "blackDusk.main",
                            }}
                        ></WbSunnyIcon>
                    </Box>
                </Stack>
            </Container>

            <Stack direction="row" justifyContent="space-between" sx={{ m: 1 }}>
                <Typography variant="label">{source}</Typography>

                <Typography variant="label">{destination}</Typography>
            </Stack>
        </Container>
    );
};

TransactionComponent.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
};

export default TransactionComponent;
