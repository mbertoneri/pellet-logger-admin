import isGrantedPage from 'hoc/isGrantedPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteCollection } from 'typings/shared';

type Props = {
    routes: RouteCollection;
};

export const ComponentRouter: React.FC<Props> = ({ routes }) => (
    <Switch>
        {Object.values(routes).map(({ exact, path, component, roles }, index) => (
            <Route key={index} exact={exact} path={path} component={isGrantedPage(component, roles)} />
        ))}
    </Switch>
);
