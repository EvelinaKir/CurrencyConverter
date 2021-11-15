import { createSlice } from "@reduxjs/toolkit"
import { getCurrency,getConvert } from "../functions";


interface TInitialState {
    data: any | null,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: boolean,
    baseCurrency: string,
    conventer: any | null,
    dataToConvert: any,
    conventerLoading: 'idle' | 'pending' | 'succeeded' | 'failed',

}



const initialState:TInitialState = {
    data: null,
    loading: 'idle',
    error:false,
    baseCurrency: '',
    conventer: null,
    dataToConvert: null,
    conventerLoading: 'idle'
}



export const currencySlice = createSlice({
    name: 'currency',
    initialState: initialState,
    reducers: {
        setDataToConvert(state, action){
            state.dataToConvert = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrency.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(getCurrency.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.data = action.payload.data;
            state.baseCurrency = action.payload.query.base_currency
        });
        builder.addCase(getCurrency.rejected, (state) => {
            state.error = true;
            state.loading = 'failed';
        });
        builder.addCase(getConvert.pending, (state) => {
            state.conventerLoading = "pending";
        });
        builder.addCase(getConvert.fulfilled, (state, action) => {
            state.conventerLoading = 'succeeded';
            state.conventer = action.payload.data;
        });
        builder.addCase(getConvert.rejected, (state) => {
            state.error = true;
            state.conventerLoading = 'failed';
        });

    }
})

const currencyReducer = currencySlice.reducer

export default currencyReducer