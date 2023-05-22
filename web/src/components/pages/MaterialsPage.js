import {withRole} from "../../utils/hoc/withAuth";
import {roles} from "../../utils/constants";
import {addMaterials, getMaterials, selector, setUpdated} from "../../store/materials";
import {MaterialEditDialog} from "../common/dialogs/MaterialEditDialog";
import {useDispatch, useSelector} from "react-redux";
import React, {memo, useCallback, useEffect, useState} from "react";
import {SearchComponent} from "../common/inputs/SearchComponent";
import {ListContainer} from "../common/ListContainer";
import {AddFab} from "../common/buttons/AddFab";
import {EditDialogButton} from "../common/dialogs/EditDialogButton";
import {useUpdate} from "../../utils/hook/hooks";
import {MaterialsListItem} from "../common/listitems/MaterialsListItem";

export const MaterialsPage = memo(
    withRole(roles.Admin)(
        () => {
            const {items, totalCount} = useSelector(selector("materials"))
            const updated = useUpdate(selector, setUpdated)
            const dispatch = useDispatch()
            const [filter, setFilter] = useState({})
            const [loading, setLoading] = useState(false)
            const itemCallback = useCallback(
                material => <MaterialsListItem key={material.id} material={material}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getMaterials(filter))
                    updated && dispatch(setUpdated(false))
                },
                [filter, updated]
            )
            useEffect(
                () => setLoading(false),
                [items]
            )
            return <>
                <ListContainer filter={filter}
                               filters={
                                   <SearchComponent filter={filter} setFilter={setFilter}/>
                               }
                               setFilter={setFilter}
                               items={items}
                               loading={loading}
                               itemCallback={itemCallback}
                               totalCount={totalCount}
                               emptyLabel={"No materials found"}/>
                <EditDialogButton EditDialog={MaterialEditDialog} EditButton={AddFab} editAction={addMaterials}
                                  material={{}}/>
            </>
        }
    )
)