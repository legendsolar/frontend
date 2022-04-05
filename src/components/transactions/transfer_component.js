import { Box, Typography, Container, Stack } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PropTypes from "prop-types";

import BankAccountIcon from "../../assets/icons/bank_account_icon.png";
import PanelIcon from "../../assets/icons/panel_icon.png";
import WalletIcon from "../../assets/icons/wallet_icon.png";

const TransactionComponent = ({ title, amount, source, destination, date }) => {
    const amountString = () => {
        try {
            return amount.toFixed(2);
        } catch {
            return amount;
        }
    };

    const bankAccountIcon = (
        <img style={{ width: "87px" }} src={BankAccountIcon}></img>
    );

    const solarAccountIcon = (
        <img style={{ width: "87px" }} src={PanelIcon}></img>
    );

    const walletIcon = <img style={{ width: "87px" }} src={WalletIcon}></img>;

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
                        {bankAccountIcon}
                    </Box>

                    <Box
                        display="flex"
                        justifyContent={"center"}
                        alignItems="center"
                        sx={{ width: "50%" }}
                    >
                        {solarAccountIcon}
                    </Box>
                </Stack>

                <Box
                    sx={{
                        backgroundColor: "legendaryGreen.main",
                        width: "20px",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Typography
                        sx={{
                            m: 0,
                            position: "absolute",
                            color: "legendaryGreen.contrastText",
                            top: "50%",
                            left: "50%",
                            transform:
                                "translateX(-50%) translateY(-50%) rotate(90deg);",
                            fontFamily: "Azeret Mono",
                            fontSize: "10px",
                            verticalAlign: "middle",
                            textAlign: "center",
                            fontWeight: 800,
                        }}
                    >
                        {"Status"}
                    </Typography>
                </Box>
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
