import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'Todoview',

    initialState: {
        todoArr: []
    },
    reducers: {
        Firstitem: (state, action) => {
          console.log(action.payload,'first')
         state.todoArr =  state.todoArr.concat(action.payload)
        },
        Additem: (state, action) => {
         console.log(Object.keys(action.payload),'add')
         state.todoArr.push(action.payload)
        },
        Deleteitem: (state, action) => {
            console.log(action.payload.id,'ID')
            state.todoArr = state.todoArr.filter((items) => items.id !== action.payload.id)

        },
        Edititem: (state, action) => {
            alert("edit")
            console.log(action.payload.Id, 'edit ID')
            console.log(action.payload.Name, 'edit name')
            console.log(action.payload.Phoneno, 'edit p')
            console.log(action.payload.Email, 'edit e')
            console.log(action.payload.Designation, 'edit d')

            state.todoArr = state.todoArr.map((items) => {
                console.log(items.Id, 'Ids')
                console.log(action.payload.id, 'id')
                if (items.Id === action.payload.id) {

                    return {
                        id: action.payload.Id,
                        name: action.payload.Name,
                        phoneno: action.payload.Phoneno,
                        email: action.payload.Email,
                        designation: action.payload.Designation
                    }

                }
                return items;


            })
            console.log("edittrigger")
        }
    }

})
export default todoSlice.reducer;
export const { Firstitem, Additem, Deleteitem, Edititem } = todoSlice.actions;