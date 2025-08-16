import axios from "axios";
import url from "../../constants/url";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getStateList = createAsyncThunk(
    'dashboard/getStateList',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(url.get_state.url);
            return response.data;
        } catch (err) {
            return err
        }
    }
)

export const getDistrictListByState = createAsyncThunk(
    'dashboard/getDistrictListByState',
    async (params, thunkAPI) => {
        try {
            const response = await axios.get(
                url.get_district_by_state.url,
                { params: params }
            );
            return response.data;
        } catch (err) {
            return err
        }
    }
)

export const getConstituancyListByDistrict = createAsyncThunk(
    'dashboard/getConstituancyListByDistrict',
    async (params, thunkAPI) => {
        try {
            const response = await axios.get(
                url.get_constituancy_by_district.url,
                { params: params }
            );
            return response.data;
        } catch (err) {
            return err
        }
    }
)

export const getPolingBooth = createAsyncThunk(
    'dashboard/getPolingBooth',
    async (params, thunkAPI) => {
        try {
            const response = await axios.get(
                url.get_polling_booth.url,
                { params: params },
            );
            return response.data;
        } catch (err) {
            return err
        }
    }
)

export const getPolingStationEditablePdf = createAsyncThunk(
    'dashboard/getPolingStationEditablePdf',
    async (params, thunkAPI) => {
        try {
            const response = await axios.get(
                url.polling_station_editable_pdf.url,
                { params: params },
            );
            return response.data;
        } catch (err) {
            return err
        }
    }
)