import {withAuth, withRole} from "../../utils/hoc/withAuth";
import {roles} from "../../utils/constants";
import {getOrders, selector, setUpdated} from "../../store/order";
import {useDispatch, useSelector} from "react-redux";
import React, {memo, useCallback, useEffect, useState} from "react";
import {SearchComponent} from "../common/inputs/SearchComponent";
import {ListContainer} from "../common/ListContainer";
import {useUpdate} from "../../utils/hook/hooks";
import order from "../../store/order";
import {OrderListItem} from "../common/listitems/OrderListItem";
import {selector as authSelector} from "../../store/auth";

export const OrdersPage = memo(
    withAuth(
        () => {
            const {items, totalCount} = useSelector(selector("order"))
            const role = useSelector(authSelector("role"))
            const updated = useUpdate(selector, setUpdated)
            const dispatch = useDispatch()
            const [filter, setFilter] = useState({})
            const [loading, setLoading] = useState(false)
            const itemCallback = useCallback(
                order => <OrderListItem readonly={role!==roles.Employee} key={order.id} order={order}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getOrders(filter))
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
                               emptyLabel={"No orders found"}/>
            </>
        }
    )
)