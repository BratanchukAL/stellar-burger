import type {AnyAction, Middleware, MiddlewareAPI} from 'redux';

import {ActionCreatorWithPayload, AsyncThunk, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";



export const websocketMiddlewareBase =
    <
        AppDispatch extends ThunkDispatch<RootState, unknown, AnyAction>,
        RootState,
        AppActions extends PayloadAction
    >
    (
        baseUrl: string,
        path: string,

        wsStartAction:  ActionCreatorWithPayload<void, any>,
        wsDisconnectAction:  ActionCreatorWithPayload<void, any>,

        onSuccessAction:  ActionCreatorWithPayload<Event, any> | AsyncThunk<void, Event, any>,
        onErrorAction:  ActionCreatorWithPayload<Event, any> | AsyncThunk<void, Event, any>,
        onMessageAction:  ActionCreatorWithPayload<MessageEvent, any> | AsyncThunk<void, MessageEvent, any>,
        onClosedAction:  ActionCreatorWithPayload<CloseEvent, any> | AsyncThunk<void, CloseEvent, any>,
    ): Middleware => {

    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        // let closing: boolean = false

        return next => (action: PayloadAction) => {
            const {dispatch} = store;  //{getState}
            // const {type, payload} = action;

            if (wsStartAction.match(action)) {
                // объект класса WebSocket
                socket = new WebSocket(baseUrl+path);
            }

            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = (event: Event) => {
                    dispatch(onSuccessAction(event));
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = (event: Event) => {
                    dispatch(onErrorAction(event));
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = (event:  MessageEvent) => {
                    // const {data} = event; //JSON.load(data)
                    dispatch(onMessageAction(event));
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = (event: CloseEvent) => {
                    if (event.code === 0 && event.reason === 'closing')
                        dispatch(onClosedAction(event));
                    else
                        dispatch(wsStartAction())
                };

                if (wsDisconnectAction.match(action)) {
                    // closing = true
                    socket.close(0, 'closing')
                    socket = null
                }
            }

            next(action);
        };
    }) as Middleware;
}; 