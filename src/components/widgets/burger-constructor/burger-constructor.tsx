import React from "react";

import {CardPosition} from "./card-position/card-position";

export const BurgerConstructor = () => {
    return (
        <section>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <CardPosition
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                />
                <CardPosition
                    text="Краторная булка N-200i (верх)"
                    price={50}
                />
                <CardPosition
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                />
            </div>
        </section>
    );
}