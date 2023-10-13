import {RootStateType} from "components/providers/store";

export const selectIsAuthChecked = (state: RootStateType): boolean => !state.session.isLoading
export const selectIsAuthed = (state: RootStateType): boolean => state.session.isAuthed
export const selectRefreshToken = (state: RootStateType): string => state.session.credentials.refreshToken