import { Box, Grid2, Tab, Tabs, Typography } from "@mui/material";
import ProfileActivityCard from "./ProfileActivityCard";
import { useState, SyntheticEvent, useMemo } from "react";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";

export default function ProfileActivities() {
    const tabContent = useMemo(
        () => [
            { label: "Feature events", predicate: "feature" },
            { label: "Past events", predicate: "past" },
            { label: "Hosting", predicate: "hosting" },
        ], []
    );

    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams();
    const activityPredicate = tabContent[activeTab].predicate;
    const { profileActivities, loadingProfileActivities } = useProfile({ id, activityPredicate });

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    }

    if (loadingProfileActivities) return <Typography>Loading activities...</Typography>

    if (!profileActivities) return <Typography>No activities found for this user</Typography>

    return (
        <Box>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Tabs
                        value={activeTab}
                        onChange={handleChange}
                    >
                        {tabContent.map((tab, index) => (
                            <Tab label={tab.label} key={index} />
                        ))}
                    </Tabs>
                </Grid2>
            </Grid2>
            <Grid2
                container
                spacing={2}
                sx={{ marginTop: 2, height: 400, overflow: "auto" }}
            >
                {profileActivities.map((profileActivity) => (
                    <Grid2 size={2} key={profileActivity.id}>
                        <ProfileActivityCard profileActivity={profileActivity} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}