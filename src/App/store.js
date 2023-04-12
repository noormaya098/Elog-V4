import { configureStore  , createSlice} from '@reduxjs/toolkit';
// import ProductSlice from '../features/ProductSlice';
import driverslices from '../features/ShowDriver';


// const reducerSlice = createSlice({
//   name: 'store',
//   initialState: {},  
//   reducer: {
//     someAction: function(){},
//   }
// })

export const store = configureStore({
  reducer: {
    // driver : ProductSlice,
    driverslice: driverslices
  },
});
