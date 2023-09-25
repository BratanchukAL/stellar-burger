import {RootStateType} from "components/providers/store";

export const selectIsAuthed = (state: RootStateType) => state.session.isAuthed