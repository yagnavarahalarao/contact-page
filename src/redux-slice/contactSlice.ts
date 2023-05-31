import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface contactType {
  firstName: string;
  lastName: string;
  status: "active" | "inActive";
}

export interface initialStateType {
  contacts: contactType[];
  actionIndex: number;
  editIndex: number;
}

const initialState: initialStateType = {
  contacts: [
    { firstName: "Chandra", lastName: "sekhar", status: "active" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Sai", lastName: "nadh", status: "inActive" },
    { firstName: "Yagna", lastName: "varahal", status: "active" },
  ],
  actionIndex: -1,
  editIndex: -1,
};

const contactSlice = createSlice({
  name: "Contact",
  initialState,
  reducers: {
    createContact: (state, action: PayloadAction<contactType>) => {
      state.contacts.push(action.payload);
    },
    editContact: (state, action: PayloadAction<contactType>) => {
      state.contacts = state.contacts.map((contact, index) => {
        if (index == state.actionIndex) {
          return action.payload;
        } else {
          return contact;
        }
      });
      state.actionIndex = -1;
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter((contact, index) => {
        if (index != action.payload) return contact;
      });
    },
    setEdiIndex: (state, action: PayloadAction<number>) => {
      state.editIndex = action.payload;
    },
    setActionIndex: (state, action: PayloadAction<number>) => {
      if (state.actionIndex === action.payload) {
        state.actionIndex = -1;
      } else {
        state.actionIndex = action.payload;
      }
    },
  },
});

export const {
  createContact,
  editContact,
  setEdiIndex,
  setActionIndex,
  deleteContact,
} = contactSlice.actions;
export default contactSlice.reducer;
