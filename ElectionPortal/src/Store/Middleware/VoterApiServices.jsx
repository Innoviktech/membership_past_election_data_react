import axios from "axios";
import url from "../../constants/url";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getStateList = createAsyncThunk(
    'dashboard/getStateList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(url.get_state.url);
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getDistrictListByState = createAsyncThunk(
    'dashboard/getDistrictListByState',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                url.get_district_by_state.url,
                { params: params }
            );
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getConstituancyListByDistrict = createAsyncThunk(
    'dashboard/getConstituancyListByDistrict',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                url.get_constituancy_by_district.url,
                { params: params }
            );
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getPollingBoothListByConstituancy = createAsyncThunk(
    'dashboard/getPollingBoothListByConstituancy',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                url.get_polling_booth_by_constituancy.url,
                { params: params }
            );
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getPolingBooth = createAsyncThunk(
    'dashboard/getPolingBooth',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                url.get_polling_booth.url,
                { params: params },
            );
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getPolingStationEditablePdf = createAsyncThunk(
    'dashboard/getPolingStationEditablePdf',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                url.polling_station_editable_pdf.url,
                { params: params },
            );
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getPdfPageCount = createAsyncThunk(
    'dashboard/getPdfPageCount',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                url.pdf_page_count.url,
                formData, // This should be FormData object
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 30000,
                }
            );
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || 
                         err.response?.data?.message || 
                         err.message || 
                         'Failed to get PDF page count';
            return rejectWithValue(error);
        }
    }
);

export const convertUploadedPdf = createAsyncThunk(
    'dashboard/convertUploadedPdf',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                url.upload_and_convert_pdfs.url,
                formData, // This should be FormData object
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    // timeout: 30000,
                }
            );
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || 
                         err.response?.data?.message || 
                         err.message || 
                         'Failed to get PDF page count';
            return rejectWithValue(error);
        }
    }
);

// export const convertUploadedPdf = createAsyncThunk(
//     'dashboard/convertUploadedPdf',
//     async (arg, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 url.upload_and_convert_pdfs.url,
//                 { data: arg }
//             );
//             return response.data;
//         } catch (err) {
//             const error = err.response?.data?.error || err.message;
//             return rejectWithValue(error);
//         }
//     }
// )