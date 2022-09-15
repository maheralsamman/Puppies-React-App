import React, { useEffect, useState } from "react";
import { FormProps, NewPuppie } from "./types";
function Form({ addPuppie, puppieToUpdate, updatePuppie }: FormProps) {
  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  useEffect(() => {
    setName(
      Object.keys(puppieToUpdate).length !== 0 ? puppieToUpdate.name : name
    );
    setBreed(
      Object.keys(puppieToUpdate).length !== 0 ? puppieToUpdate.breed : breed
    );
    setBirthdate(
      Object.keys(puppieToUpdate).length !== 0
        ? puppieToUpdate.birthdate
        : birthdate
    );
  }, [puppieToUpdate]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(puppieToUpdate).length !== 0) {
      let imgUrl = puppieToUpdate.imgUrl;
      updatePuppie({ name, breed, birthdate, imgUrl }, puppieToUpdate.id);
    } else addPuppie({ name, breed, birthdate });
    setName("");
    setBreed("");
    setBirthdate("");
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name" className="form__label">
        <p>Name</p>
        <input
          className="form__input"
          value={name}
          onInput={(e: React.FormEvent<HTMLInputElement>): void =>
            setName(e.currentTarget.value)
          }
          type="text"
          placeholder={name}
          name="name"
          autoComplete="off"
        />
      </label>
      <label htmlFor="breed" className="form__label">
        <p>Breed</p>

        <input
          className="form__input"
          value={breed}
          onInput={(e: React.FormEvent<HTMLInputElement>): void =>
            setBreed(e.currentTarget.value)
          }
          type="text"
          placeholder={breed}
          name="breed"
        />
      </label>
      <label htmlFor="birthdate" className="form__label">
        <p>Birthdate</p>

        <input
          className="form__input"
          value={birthdate}
          onInput={(e: React.FormEvent<HTMLInputElement>): void =>
            setBirthdate(e.currentTarget.value)
          }
          type="text"
          placeholder={birthdate}
          name="birthdate"
        />
      </label>
      <label htmlFor="submit">
        <p className="form__hidden">a</p>
        <button className="form__submit" type="submit" name="submit">
          {Object.keys(puppieToUpdate).length !== 0 ? "Update" : "Submit"}
        </button>
      </label>
    </form>
  );
}

export default Form;
