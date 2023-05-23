import {useDispatch, useSelector} from "react-redux";
import React, {memo, useCallback, useEffect, useState} from "react";
import {MaterialsListButton} from "../common/buttons/MaterialsListButton";
import {getMaterials, selector} from "../../store/materials";
import {ListContainer} from "../common/ListContainer";
import {SearchComponent} from "../common/inputs/SearchComponent";

export const Step1 = memo(
    ({nextStep, formik}) => {
        const {items, totalCount} = useSelector(selector("materials"))
        const [filter, setFilter] = useState({})
        const [loading, setLoading] = useState(false)
        const dispatch = useDispatch()
        const onClick = useCallback(
            material =>
                () => {
                    formik.setFieldValue("materialId", material.id)
                    formik.setFieldValue("materialPrice", material.price)
                    nextStep();
                },
            [nextStep, formik]
        )
        const itemCallback = useCallback(
            material => <MaterialsListButton key={material.id} material={material} onClick={onClick(material)}/>,
            [onClick]
        )
        useEffect(
            () => {
                setLoading(true)
                dispatch(getMaterials(filter))
            },
            [filter]
        )
        useEffect(
            () => setLoading(false),
            [items]
        )
        return <ListContainer filter={filter}
                              filters={<SearchComponent filter={filter} setFilter={setFilter}/>}
                              setFilter={setFilter}
                              items={items}
                              loading={loading}
                              itemCallback={itemCallback}
                              totalCount={totalCount}
                              emptyLabel={"No materials found"}/>
    }
)