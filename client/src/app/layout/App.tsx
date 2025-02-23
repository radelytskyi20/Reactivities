import { useEffect, useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashbord from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivtiy, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities').then(response => setActivities(response.data));
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id))
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(x => x.id === activity.id ? activity : x))
    } else {
      const newActivity = {...activity, id: activities.length.toString()}
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  }

  const handleDelete = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id))
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar
        openForm={handleOpenForm}
      />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashbord
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivtiy}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          handleDelete={handleDelete}
        />
      </Container>
    </Box>
  )
}

export default App
