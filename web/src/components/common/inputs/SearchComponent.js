import {useQueryParam} from "use-query-params";
import React, {memo, useCallback, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import {CustomTextField} from "./CustomTextField";
import {IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


export const SearchComponent = memo(
    ({filter, setFilter}) => {
        const [query, setQuery] = useQueryParam('query')
        useEffect(
            () => setFilter({
                ...filter,
                query: query || ''
            }),
            [query]
        )
        const onSubmit = useCallback(
            ({query}) => setQuery(query || null),
            []
        )
        const {t} = useTranslation()
        const initialValues = {
            query: query || ''
        }
        const formik = useFormik({initialValues, onSubmit})
        return <form onSubmit={formik.handleSubmit}>
            <CustomTextField
                name="query"
                InputProps={{
                    endAdornment: (
                        <IconButton variant="contained" position="start" type="submit">
                            <SearchIcon/>
                        </IconButton>
                    )
                }}
                formik={formik}
                label={t("Search")}
                sx={{width: "100%"}}/>
        </form>;
    }
)