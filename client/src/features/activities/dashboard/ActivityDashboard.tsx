import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDeatils from "../details/ActivityDeatils";
import ActivityForm from "../form/ActivityForm";

type Prop = {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity: Activity | undefined;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
}

export default function ActivityDashbord({
    activities,
    selectActivity,
    cancelSelectActivity,
    selectedActivity,
    openForm,
    closeForm,
    editMode }: Prop) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDeatils
                        selectedActivity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                    />
                }
            </Grid2>
        </Grid2>
    )
}