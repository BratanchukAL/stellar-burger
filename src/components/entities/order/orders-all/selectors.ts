import {RootStateType} from "components/providers/store";


export const selectIsStreamingOrdersAll = (state: RootStateType) => state.ordersAllFeed.isStreaming;
export const selectOrdersAll = (state: RootStateType) => state.ordersAllFeed.data;