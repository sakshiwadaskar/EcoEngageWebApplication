import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Event } from "../models/Event";
import { AppState } from ".";

export type EventState = Event[];

const initiateState: EventState = [];

export const eventSlice = createSlice({
  name: 'events',
  initialState: initiateState,
  reducers: {
    loadEvents: (_state: EventState | null, action: PayloadAction<EventState>) => {
      return [...action.payload];
    }
  }
});

//Actions
export const { loadEvents } = eventSlice.actions;

//Selectors
export const getAllEvents = (): ((state: AppState) => EventState) => {
  return (state: AppState) => { 
    return state.events
  };
}

export const findEventById = (id: string): ((state: AppState) => Event | undefined) => {
  return (state: AppState) => state.events.find(eve => eve.id === id);
}

//Reducers
export default eventSlice.reducer;
