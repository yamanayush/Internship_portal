import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';
const DashBoard = () => {
    const { authUser }=useAuthContext(); 
    const [appliedOppurtunities,setAppliedOppurtunities] =  useState([])
    const [userData, setUserData] = useState({});
    const [error,setError] = useState("");
    useEffect(()=>{
        if(authUser){
          const fetchAppliedOppurtunities=async()=>{
            try {
              const response =await axios.get(`/api/applied-oppurtunities`)
              console.log("response",response)
            setAppliedOppurtunities(response.data)
            } catch (error) {
              console.log(error)
            }
          }
          fetchAppliedOppurtunities()
      }
      },[])
      
      useEffect(() => {
        axios.get(`/api/profile`)
          .then(response => {
            setUserData(response.data.user);
          })
          .catch(error => {
            console.error(error);
          },[]);
      });
      function handleSubmit(e){
        e.preventDefault();
        if(!username){
            setError("Username fields can't be empty!")
            return;
        }
        axios.post(`/api/profileUpdate`,{
            username,
            email,
            password,
            dob,
            address
        }).then((res)=>{
            setError("You have Updated Successfully")
        }).catch(()=>{
            setError("Internal Error Occured, Please try Again.")
        })
    }
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [dob, setDob] = useState("");
      const [address, setAddress] = useState("");
      
      useEffect(() => {
        if(userData){
       if (userData.username) {
          setUsername(userData.username);
        }
        if (userData.email) {
            setEmail(userData.email);
          }
        if (userData.password) {
            setPassword(userData.password);
          } 
        if (userData.dob) {
            setDob(new Date(userData.dob).toISOString().split('T')[0]);
          }
        if (userData.address) {
            setAddress(userData.address);
          }
        }
      }, [userData]);
  return (
    <div className='flex flex-col gap-4'>
    <div className='profile-card bg-white shadow-md'>
         <div>
      <form onSubmit={handleSubmit} >
      <h1>Profile Details</h1>
      {error && <p>{error}</p>}
      <div className='profile_details'>
      <div>
        <label htmlFor="username">UserName:</label>
        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type='email' value={email} disabled />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input type='date' value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea value={address} onChange={(e)=>{setAddress(e.target.value)}}></textarea>
      </div>
      </div>
      <input type="hidden" value={password} />
      <button type='submit' className='bg-white border rounded-xl border-emerald-700 text-emerald-500 shadow-lg p-5'>Update</button>
      </form>
        </div>
      </div>
      <div className='flex flex-wrap gap-4  w-full'>
        {
          appliedOppurtunities.length !==0 && appliedOppurtunities.map((profile)=>{
            const {profile_name, stipend, company_name, location_names, duration}= profile;
            return (
              <div className='profile-card  bg-white shadow-md'>
              <h2>{profile_name}</h2>
              <p><strong>Company Name:</strong>{company_name}</p>
              <p><strong>Stipend:</strong> {stipend}</p>
              {/* <p><strong>Location:</strong> {location_names[0]?profile.location_names[0]:"Work From Home"}</p> */}
              <p><strong>Duration:</strong> {duration}</p>
              <button className='bg-white border rounded-xl border-emerald-700 text-emerald-500 shadow-lg p-5'>{"Applied"}</button>
          </div>)
          })
        }
        {(appliedOppurtunities===undefined||appliedOppurtunities.length ===0) && <div className='profile-card  bg-white shadow-md p-5'>
          You have Not applied for any job.
          </div>}
        </div>
    </div >
  )
}

export default DashBoard