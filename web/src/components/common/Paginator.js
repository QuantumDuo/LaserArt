import {NumberParam, useQueryParam} from "use-query-params";
import React, {memo, useCallback, useEffect, useMemo} from "react";
import {Pagination, Stack} from "@mui/material";

export const Paginator = memo(
    ({filter, setFilter, totalCount}) => {
        const [page, setPage] = useQueryParam('page', NumberParam)
        useEffect(
            () => {
                console.info(page)
                page && setFilter({
                        ...filter,
                        page
                    })
            },
            [page]
        )
        const onChange = useCallback(
            (e, page) => setPage(page),
            [setPage]
        )
        const count = useMemo(
            () => Math.ceil(totalCount / 10),
            [totalCount]
        )
        return totalCount > 10 &&
            <Stack alignItems="center">
                <Pagination count={count} onChange={onChange} page={page} showFirstButton showLastButton/>
            </Stack>
    }
)