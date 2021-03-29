import React from 'react'
import { 
    Card, CardContent, Typography
} from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, total, cases, current, isRed, isPurple, isGreen, isGrey, ...props}) {
    return (
        <Card 
            onClick={props.onClick} 
            className={`infoBox ${current && "infoBox--selected"} ${isPurple && "infoBox--purple"} ${isRed && "infoBox--red"} ${isGreen && "infoBox--green"} ${isGrey && "infoBox--grey"}`}>
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">{title}</Typography>
                <h2 className={`${isPurple && "infoBox_total--purple"} ${isRed && "infoBox_total--red"} ${isGreen && "infoBox_total--green"} ${isGrey && "infoBox_total--grey"}`}>{total}</h2>
                <Typography className="infoBox_cases" color="textSecondary">Today:  {cases > 0? '+' : ''}{cases}</Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
