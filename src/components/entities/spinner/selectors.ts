import {RootStateType} from "components/providers/store";

export const selectIsLoading = (state: RootStateType): boolean => state.spinner.isLoading
export const selectText = (state: RootStateType): string => state.spinner.text