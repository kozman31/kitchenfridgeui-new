export const parseInputToJSON =(data: any) => {
    let formInput:{[index:string]:any}={};
    for(let key in data){
      formInput[key]= data[key].value
    }
    return formInput;
  }

  export const parseIngredientToJSON =(data: any) => {
    let ingredientList=[];
    for(let key in data){
      ingredientList.push({name:data[key].ingredientName, quantity:data[key].ingredientAmount});
    }
    return ingredientList;
  }