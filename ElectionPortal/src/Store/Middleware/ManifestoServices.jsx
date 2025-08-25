import axios from "axios";
import url from "../../constants/url";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPartyList = createAsyncThunk(
    'dashboard/getpartyList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(url.getAllParty.url);
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getElectionTypeList = createAsyncThunk(
    'dashboard/getElectionTypeList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(url.getAllElectionType.url);
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getYearByElectionTypeList = createAsyncThunk(
    'dashboard/getYearByElectionTypeList',
    async ({electionTypeId}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url.getYearByElectionType.url}/?election_type_id=${electionTypeId}`);
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getManifestoByPartyList = createAsyncThunk(
    'dashboard/getManifestoByPartyList',
    async ({ election_type_id, year_id,party_id }, { rejectWithValue }) => {
        try {
            const response = await axios.post(url.getManifestoPromisesByParty.url,{election_type_id:election_type_id, year_id:year_id,party_id:party_id});
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)

export const getAllManifestoList = createAsyncThunk(
    'dashboard/getAllManifestoList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(url.getAllManifestoPromises.url);
            return response.data;
        } catch (err) {
            const error = err.response?.data?.error || err.message;
            return rejectWithValue(error);
        }
    }
)
