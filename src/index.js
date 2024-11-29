
import React from 'react';
import "hide-cra-error-overlay";
import ReactDOM from 'react-dom/client';
import {Route,Routes,BrowserRouter} from 'react-router-dom';

import { store } from './app/store';
import { Provider } from 'react-redux';
/* imports of pages*/
    import Login from './features/auth/Login';
    import Dahboard from './layouts/dashboardLayout';
/*End  imports of pages*/

/* imports of protective routes*/
import RequireAuth from './features/auth/RequireAuth';
import User from './features/user/User';
import Home from './features/home/Home';
import Personnel from './features/personnel/Personnel';
import ViewPersonnels from './features/personnel/ViewPersonnels';
import CreatePersonnel from './features/personnel/CreatePersonnel';
import UpdatePersonnel from './features/personnel/UpdatePersonnel';
import ViewUsers from './features/user/ViewUsers';
import CreateUser from './features/user/CreateUser';
import UpdateUser from './features/user/UpdateUser';
/* End imports of protective routes*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<RequireAuth />}>
                    <Route path="dashboard/*" element={<Dahboard />}>
                        <Route path="" element={<Home />} />
                        <Route path="users/*" element={<User />}>
                             <Route path="" element={<ViewUsers />} />
                             <Route path="new-user" element={<CreateUser />} />
                             <Route path="update-user/:id" element={<UpdateUser />} />
                        </Route>
                        <Route path="personnels/*" element={<Personnel />}>
                             <Route path="" element={<ViewPersonnels />} />
                             <Route path="new-personnel" element={<CreatePersonnel />} />
                             <Route path="update-personnel/:id" element={<UpdatePersonnel />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
     </Provider>
  </React.StrictMode>
);

