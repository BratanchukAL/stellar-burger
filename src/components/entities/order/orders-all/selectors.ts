import {RootStateType} from "components/providers/store";


// export const selectIsStreamingOrdersAll = (state: RootStateType) => state.ordersAll.isStreaming;
// export const selectOrdersAll = (state: RootStateType) => state.ordersAll.data;
export const selectOrdersAll = (state: RootStateType) => state.ordersAll;