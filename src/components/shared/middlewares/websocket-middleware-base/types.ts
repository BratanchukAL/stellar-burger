import {ActionCreatorWithPayload, AsyncThunk} from "@reduxjs/toolkit";

export type TWSActions = ActionCreatorWithPayload<void, any>

export type TWSOnActionWithEvent = ActionCreatorWithPayload<Event, any> | AsyncThunk<void, Event, any>
export type TWSOnActionWithMessageEvent = ActionCreatorWithPayload<MessageEvent, any> | AsyncThunk<void, MessageEvent, any>
export type TWSOnActionWithMessageCloseEvent = ActionCreatorWithPayload<CloseEvent, any> | AsyncThunk<void, CloseEvent, any>