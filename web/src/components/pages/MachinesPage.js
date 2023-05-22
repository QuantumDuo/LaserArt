import React, {memo, useCallback, useEffect, useState} from "react";
import {withRole} from "../../utils/hoc/withAuth";
import {roles} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {addMachines, getMachines, selector, setUpdated} from "../../store/machine";
import {useUpdate} from "../../utils/hook/hooks";
import {ListContainer} from "../common/ListContainer";
import {SearchComponent} from "../common/inputs/SearchComponent";
import {EditDialogButton} from "../common/dialogs/EditDialogButton";
import {AddFab} from "../common/buttons/AddFab";
import {MachineListItem} from "../common/listitems/MachineListItem";
import {MachineEditDialog} from "../common/dialogs/MachineEditDialog";


export const MachinesPage = memo(
    withRole(roles.Admin)(
        () => {
            const {items, totalCount} = useSelector(selector("machines"))
            const updated = useUpdate(selector, setUpdated)
            const dispatch = useDispatch()
            const [filter, setFilter] = useState({})
            const [loading, setLoading] = useState(false)
            const itemCallback = useCallback(
                machine => <MachineListItem key={machine.id} machine={machine}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getMachines(filter))
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
                               emptyLabel={"No machines found"}/>
                <EditDialogButton EditDialog={MachineEditDialog} EditButton={AddFab} editAction={addMachines}
                                  machine={{}}/>
            </>
        }
    )
)