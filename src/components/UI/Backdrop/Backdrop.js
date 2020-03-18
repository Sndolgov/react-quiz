import React from 'react'
import classes from './Backdrop.module.css'

export default (props) => {
    return (
        <div
        className={classes.Backdrop}
        onClick={()=>props.onClick()}
        />
    )
}