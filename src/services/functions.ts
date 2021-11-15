import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./axios";

type TReq = {
    additionalUrl?: string | null,
}

type TData = {
    from: string,
    to: string,
    howMany: null | number,
    error: boolean
}

export const getCurrency = createAsyncThunk(
    'currency/getCurrency',
    async function (data: TReq){
        const res = await instance.get(`latest?apikey=bd97ebc0-4606-11ec-b9e5-9da3cdae2223&base_currency=${data.additionalUrl}`)
        return res.data
    }
)

export const getConvert = createAsyncThunk(
    'currency/getConvert',
    async function (data: string){
        const res = await instance.get(`latest?apikey=bd97ebc0-4606-11ec-b9e5-9da3cdae2223&base_currency=${data}`)
        return res.data
    }
)


export const convertValue = (data:any, convert: string) => {
    const loweredAndSplitted = convert.toUpperCase().split(' ')
const enteredNumber = loweredAndSplitted.find((elem) => {
    if (!isNaN(Number(elem))) {
        return Number(elem)
    }
})
let filteredCurrent:any = []

for (let datakey in data){
    const index =  loweredAndSplitted.indexOf(datakey)
    if (index !== -1) {
    filteredCurrent[index] = datakey
    }
}
const result = filteredCurrent.filter((elem:any) => elem)
const total:any = {
    from: '',
    to: '',
    howMany: null,
    error: false
}
if (result.length !== 2 || !enteredNumber) {
    total.error = true
}
else {
 total.from = result[0]
 total.to = result[1]
 total.howMany = enteredNumber
}
return total
}

export const countValue = (conventer:any, dataToConvert:TData) => {
    let result
    const rightСurrency = dataToConvert.to
     result = conventer[rightСurrency]

if (dataToConvert.howMany)
return `${(result * dataToConvert.howMany).toFixed(3)} ${dataToConvert.to}`
else return 'ops'
}