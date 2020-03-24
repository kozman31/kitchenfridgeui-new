export const parseInputToJSON =(data: any) => {
    let formInput:{[index:string]:any}={};
    for(let key in data){
      formInput[key]= data[key].value
    }
    return formInput;
  }

  export const parseIngredientToJSON =(data: any) => {
    let ingredientList:{[index:string]:any}={};
    for(let key in data){
      ingredientList[key]= {ingredientName:data[key].ingredientName, ingredientAmount:data[key].ingredientAmount};
    }
    return ingredientList;
  }