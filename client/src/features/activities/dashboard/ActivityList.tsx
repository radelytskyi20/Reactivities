import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
    activities: Activity[];
    selectActivity: (id: string) => void;
    handleDelete: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, handleDelete }: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {activities.map(activity => (
                <ActivityCard
                    key={activity.id}
                    activity={activity}
                    selectActivity={selectActivity}
                    handleDelete={handleDelete}
                />
            ))}
        </Box>
    )
}