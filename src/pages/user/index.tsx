import ComponentRouter from 'components/ComponentRouter';
import { routes } from 'pages/user/routes';
import React from 'react';

export default (): React.ReactElement => {
    console.log('component router !!!');
    return <ComponentRouter routes={routes} />;
};
