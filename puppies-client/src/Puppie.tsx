import React, { useState } from 'react';
import { PuppieProps } from './types';

function Puppie({ puppie, deletePuppie, getPuppie, updatePuppie }: PuppieProps) {
  const [isShowing, setIsShowing] = useState(false);
  const handleUpdate = (id: number) => {
    getPuppie(id)
  }
  const handleDelete = (id: number) => {
    deletePuppie(id);
  }
  return(
  <div className='puppie' onClick={() => setIsShowing(!isShowing)}>
    <img className={isShowing ? 'puppie__img imgSmall' : 'puppie__img'} src={puppie.imgUrl} alt="dog" />
    <h3 className='puppie__title' >{puppie.name}</h3>
    {isShowing ? 
    <>
      <p className='puppie__breed'>{puppie.breed}</p>
      <p className='puppie__birthdate'>{puppie.birthdate}</p>
      <button className='puppie__updateBtn' onClick={() => handleUpdate(puppie.id)}>Update</button>
      <button className='puppie__deleteBtn' onClick={() => handleDelete(puppie.id)}>Delete</button>
    </> : ""}

  </div>);
}

export default Puppie;