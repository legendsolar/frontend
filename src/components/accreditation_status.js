import {
    Stack,
    Button,
    Box,
    Chip,
    Typography,
    Link,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import CheckboxList from "./inputs/checkbox_list";
import { useDatabaseObjectData, useDatabase } from "reactfire";
import { set, ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";

const AccreditationStatus = ({ onContinue }) => {
    const auth = useAuth();
    const user = auth.user;

    const [accreditationOptionsList, setAccreditationOptionsList] = useState({
        INCOME: {
            title: "Income",
            description:
                "I earn $200,000 yearly, or $300,000 with my spousal equivalant",
            accredited: true,
            attribute: "INCOME",
        },
        PERSONAL_NET_WORTH: {
            title: "Personal Net Worth",
            description:
                "I have $1,000,000 in assets, excluding my primary residence",
            accredited: true,
            attribute: "PERSONAL_NET_WORTH",
        },
        LICENSE_HOLDER: {
            title: "License Holder",
            description:
                "I hold a Series 7, 65, or 82 license currently in good standing",
            accredited: true,
            attribute: "LICENSE_HOLDER",
        },
        ENTITY_OWNER: {
            title: "Entity Owner",
            description:
                "I own an entity (e.g. family office) with $5,000,000+ in assets",
            accredited: true,
            attribute: "ENTITY_OWNER",
        },
        NONE: {
            title: "None of the above",
            description: "I am not an accredited investor",
            exclusive: true,
            accredited: false,
            attribute: "NONE",
        },
    });

    const [checkedList, setCheckedList] = useState([]);
    const [loading, setLoading] = useState(false);

    const database = useDatabase();
    const { status, data: userInfo } = useDatabaseObjectData(
        ref(database, "users/" + user.uid)
    );

    if (status == "success") {
        console.log(userInfo);
        if (
            userInfo &&
            userInfo.accreditation &&
            userInfo.accreditation.attributes
        ) {
            const list = { ...accreditationOptionsList };
            Object.entries(userInfo.accreditation.attributes).map(
                ([key, val]) => {
                    if (val.status) {
                        list[key].checked = val.status;
                    }
                }
            );
        }
    }

    const onContinueClick = () => {
        var accreditationStatus = "NOT_ACCREDITED";
        const accreditationAttributes = Object.fromEntries(
            Object.entries(checkedList).map(([key, checked]) => {
                if (checked && accreditationOptionsList[key].accredited) {
                    accreditationStatus = "ACCREDITED";
                }

                return [
                    key,
                    {
                        status: checked,
                        attribute: accreditationOptionsList[key].attribute,
                    },
                ];
            })
        );

        const databaseObject = {
            status: accreditationStatus,
            attributes: accreditationAttributes,
        };

        setLoading(true);

        set(
            ref(database, "users/" + user.uid + "/accreditation/"),
            databaseObject
        ).then(() => {
            setLoading(false);
            onContinue();
        });
    };

    return (
        <div>
            <Stack
                sx={{
                    backgroundColor: "whiteHaze.main",
                    mt: -2,
                    p: 2,
                    ml: -2,
                    mr: -2,
                }}
                spacing={2}
                justifyContent="space-between"
            >
                <Typography variant="smallHeadline">
                    Accreditation Status
                </Typography>

                <Typography variant="description">
                    Legends Solar offers private placements regulated by the SEC
                    under Regulation D. All investors must be accredited in
                    order to participate in Legends Solar offerings.
                </Typography>

                <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    alignItems={"end"}
                >
                    <Typography variant="body2">
                        Check all that apply
                    </Typography>
                    <Chip
                        label="Learn About Investor Accreditation"
                        variant="light"
                        onClick={() => {}}
                    ></Chip>
                </Stack>
            </Stack>

            <Stack>
                <CheckboxList
                    options={accreditationOptionsList}
                    onInputChange={(checkboxListChecked) => {
                        console.log(checkboxListChecked);
                        setCheckedList(checkboxListChecked);
                    }}
                ></CheckboxList>

                <Button
                    variant="primary"
                    disabled={
                        !Object.keys(checkedList).some((k) => checkedList[k]) ||
                        loading
                    }
                    onClick={() => onContinueClick()}
                >
                    {loading ? (
                        <CircularProgress color="dark" size={30} />
                    ) : (
                        "Continue"
                    )}
                </Button>
            </Stack>
        </div>
    );
};

export default AccreditationStatus;
