import React from 'react';
import { Typography } from 'antd';
import DefaultUserData, { userData } from './Store'
import Navigation from './Components/Navigation'
import {
  BrowserRouter as Router,
  Route,Redirect
} from 'react-router-dom';
import * as ROUTES from './Routes'
import UsersOverview from './Components/Users'
import Statistics from './Components/Statistics'
import './App.less'
import Homepage from './Components/HomePage';
const { Title } = Typography;

const App = () => {
  const [data = [], setData] = React.useState(userData)

  const addUser = React.useCallback((userData) => {
      if(userData.country && userData.name && userData.birthday) 
        setData(users => [{...userData, id: new Date().valueOf()}, ...users])
  }, [])

  
  const removeUser = React.useCallback((id) => {
      setData(users => users.filter(u => u.id !== id))
  }, [])

  const editUser = React.useCallback((userData) => {
    setData(users => users.map(u => u.id !== userData.id ? u : ({ ...u, ...userData })))
  }, [])
  return (
    <Router>
      <Redirect to='/' />
      <DefaultUserData.Provider value={{
        data,
        addUser,removeUser,editUser
      }}>
        <section style={{ textAlign: 'center', marginTop: 18, marginBottom: 30 }}>
          <Title level={2}>
            <img
              style={{ width: 40, height: 40, marginRight: 12, verticalAlign: 'bottom' }}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt="Ant Design"
            />
          Ant Design Dashboard
        </Title>
        </section>
        <section className="app-background">
          <Navigation />
          <Route exact path={ROUTES.HOME} component={Homepage} />
          <Route exact path={ROUTES.STATISTICS} component={Statistics} />
          <Route path={ROUTES.USERDETAILS} component={UsersOverview} />
        </section>
        <section className="app-footer">
        </section>
      </DefaultUserData.Provider>
    </Router>
  );
}

export default App;
