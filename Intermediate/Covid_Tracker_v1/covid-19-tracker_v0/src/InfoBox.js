import React from 'react'
import { 
    Card, CardContent, Typography
} from "@material-ui/core";

function InfoBox({ title, total, sub, cases}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">{title}</Typography>
                <h2 className="infoBox_total">{total}</h2>
                <Typography className="infoBox_title" color="textSecondary">{sub}</Typography>
                <Typography className="infoBox_cases" color="textSecondary">{cases > 0? '+' : ''}{cases}</Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
