// import React from 'react'
import { useSelector } from 'react-redux'

export default function Dashboard() {

 const isSideBarOpen= useSelector(
  (state :{global:{isSideBarOpen:boolean}})=>state.global.isSideBarOpen
 )
  return (
    <div className={`ml-20 ${isSideBarOpen===true?"ml-42":""}`}>dashboard</div>
  )
}
