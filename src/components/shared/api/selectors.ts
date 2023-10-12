import {RootStateType} from "components/providers/store";

export const selectAccessToken = (state: RootStateType): string => state.session.credentials.accessToken
