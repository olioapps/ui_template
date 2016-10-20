// @flow

import React from 'react'
import { Route } from 'react-router'

import * as Pages  from  './pages/page_index'


// types

type page = {
    id: string,
    path: string,
    open?: boolean,
    component: ?React.Component<*, *, *>,
}

export type pageDict = { [key: string]: page }

// maps

const pages: pageDict = {
    todoApp: {
        id: 'todoApp',
        title: 'Todo App',
        path: '/',
        open: true,
        component: Pages.todoApp,
    },
    editGreeting: {
        id: 'editGreeting',
        title: 'Edit Greeting',
        path: 'editGreeting',
        open: true,
        component: Pages.EditGreeting,
    },
}

// utils


function buildProps(pageKey: string) {
    const { path, component, ...props } = pages[pageKey] // eslint-disable-line
    return props
}

function routes() {
    return Object.keys(pages).map(pageKey => {
        const { component, id, path } = pages[pageKey]
        const props = buildProps(pageKey)
        return <Route path={path} component={component} key={id} {...props} />
    })
}


export {
    pages,
    buildProps,
    routes,
}
