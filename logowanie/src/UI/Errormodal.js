import React from "react"
import Button from "./Button"
import Card from "./Card"
import classes from './errormodal.module.css'
const Errormodal = (props) =>{
    return (
        <>
            <div className={classes.backdrop}>
                <Card className={classes.modal}>
                    <header className={classes.header}>
                        <h2>{props.title}</h2>
                    </header>
                    <div className={classes.content}>
                        <p>{props.msg}</p>
                    </div>
                    <footer>
                        <Button onclick = {props.removerror}>Powrót</Button>
                    </footer>
                </Card>
            </div>
        </>
    )
}
export default Errormodal;