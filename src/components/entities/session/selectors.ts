import {RootStateType} from "components/providers/store";

export const selectIsAuthed = (state: RootStateType) => state.session.isAuthed
export const selectRefreshToken = (state: RootStateType) => state.session.credentials.refreshToken