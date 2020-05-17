import React,{useContext, useEffect} from 'react'
import SingleUser from './Singleuser'
import DefaultUserData from '../Store'
import SingleUserAdd from './SingleuserAdd'
import MiniStatistics from './MiniStatistics'
const UsersOverview=()=>{
    const { data: userData = []} = useContext(DefaultUserData)
    return (
        <>
            <SingleUserAdd/>
            <div className="users-container">
            {userData.map(user => <SingleUser key={user.id} {...user}/>)}
            </div>
            <MiniStatistics/>
        </>
    )
}





export default UsersOverview
