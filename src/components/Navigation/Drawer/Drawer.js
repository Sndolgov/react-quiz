import React, {Component} from 'react'
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";


class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    };

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [
            classes.Drawer
        ];
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = this.props.isAuthenticated
            ? [
                {to: '/', label: 'List', exact: true},
                {to: '/quiz-creator', label: 'Create test', exact: false},
                {to: '/logout', label: 'Logout', exact: false},
            ]
            :
            [
                {to: '/', label: 'List', exact: true},
                {to: '/auth', label: 'Authorisation', exact: false},
            ];

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </>
        )
    }
}

export default Drawer