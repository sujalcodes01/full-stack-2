import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: ['pl1', 'pl2'],
  entities: {
    pl1: { id: 'pl1', name: 'React' },
    pl2: { id: 'pl2', name: 'Redux' },
  },
}

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    addPlatform: (state, action) => {
      state.ids.push(action.payload.id)
      state.entities[action.payload.id] = action.payload
    },
  },
})

export const { addPlatform } = platformsSlice.actions
export default platformsSlice.reducer
