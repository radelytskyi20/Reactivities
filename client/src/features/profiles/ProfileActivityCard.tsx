import { Card, CardMedia, CardContent, Typography } from "@mui/material"
import { Link } from "react-router"
import { formatDate } from "../../lib/utils/util"

type Props = {
    profileActivity: ProfileActivity
}

export default function ProfileActivityCard({ profileActivity }: Props) {
    return (
        <Link to={`/activities/${profileActivity.id}`} style={{ textDecoration: 'none' }}>
            <Card elevation={4}>
                <CardMedia
                    component='img'
                    height='100'
                    image={`/images/categoryImages/${profileActivity.category}.jpg`}
                    alt='image'
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                    <Typography variant="h6" textAlign="center" mb={1}>
                        {profileActivity.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        textAlign="center"
                        display='flex'
                        flexDirection='column'
                    >
                        <span>{formatDate(profileActivity.date, 'dd MMM yyyy')}</span>
                        <span>{formatDate(profileActivity.date, 'h:mm a')}</span>
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}