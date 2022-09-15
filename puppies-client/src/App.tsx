import { useEffect, useState } from 'react';
import './App.css';
import Puppies from './Puppies';
import {IPuppies , NewPuppie, UpdatePuppie} from './types';
import Form from "./Form";

function App() {

    const [puppies, setPuppies] = useState<Array<IPuppies>>({} as Array<IPuppies>);
    const [puppieToUpdate, setPuppieToUpdate] = useState<IPuppies>({} as IPuppies);
    
    useEffect(() => {
      const getData =async () => {
        const response = await fetch("http://localhost:3000/api/puppies/");
        const data = await response.json();
        setPuppies(data);
      }
      getData();
    },[])

/*     const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value; 
      //setPuppies({...user,name:value})
    } */
    const addPuppie = async (newPuppie:NewPuppie) => {
      console.log(newPuppie);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPuppie)
    };
        const response =await fetch('http://localhost:3000/api/puppies', requestOptions)
        const data = await response.json();
        setPuppies(data);
    }
    const deletePuppie = async (id:number) => {
      const response = await fetch(`http://localhost:3000/api/puppies/${id}`, { method: 'DELETE' })
      const data = await response.json();
      setPuppies(data);
    } 
    
    const getPuppie = async (id:number) => {
      const response = await fetch(`http://localhost:3000/api/puppies/${id}`);
      const data = await response.json();
      setPuppieToUpdate(data);

    }
    const updatePuppie = async(puppie: UpdatePuppie, id:number) => {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(puppie)
    };
        const response =await fetch(`http://localhost:3000/api/puppies/${id}`, requestOptions)
        const data = await response.json();
        setPuppies(data);

      setPuppieToUpdate({} as IPuppies);
    }
    return (
    <div className="App">
    <h1 className="app__title">Puppies React App</h1>
    <Form puppieToUpdate={puppieToUpdate} addPuppie={addPuppie} updatePuppie={updatePuppie}/>
    {!puppies.length ? <h2>Loading...</h2> : <Puppies
    getPuppie={getPuppie}
    deletePuppie={deletePuppie} 
    puppies={puppies} 
    updatePuppie={updatePuppie} />}
    </div>
  );
}
export default App;
