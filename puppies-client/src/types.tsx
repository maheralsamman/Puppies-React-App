export interface IPuppies {
    id:number
    name: string,
    breed:string,
    birthdate:string,
    imgUrl:string,
  }
  export interface PuppiesProps {
    puppies: Array<IPuppies>,
    deletePuppie: (id:number) => void,
    getPuppie: (id:number) => void,
    updatePuppie: (puppie:UpdatePuppie, id:number ) => void,

  }
  export interface PuppieProps {
    puppie: IPuppies,
    deletePuppie: (id:number) => void,
    getPuppie: (id:number) => void,
    updatePuppie: (puppie:UpdatePuppie, id:number ) => void,


  }
  export interface FormProps {
    puppieToUpdate: IPuppies,
    addPuppie: (puppie:NewPuppie) => void,
    updatePuppie: (puppie:UpdatePuppie, id:number ) => void,
  }

  export interface NewPuppie {
    name: string,
    breed:string,
    birthdate:string,
  }
  export interface UpdatePuppie {
    name: string,
    breed:string,
    birthdate:string,
    imgUrl:string,
  }