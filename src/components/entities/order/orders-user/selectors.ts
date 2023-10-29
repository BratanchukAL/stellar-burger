import {RootStateType} from "components/providers/store";


export const selectIsStreamingOrdersAllOfUser = (state: RootStateType) => state.ordersAllOfUser.isStreaming;
export const selectOrdersAllOfUser = (state: RootStateType) => state.ordersAllOfUser.data;