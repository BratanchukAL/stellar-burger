import {RootStateType} from "components/providers/store";

export const selectIsLoading = (state: RootStateType) => state.spinner.isLoading