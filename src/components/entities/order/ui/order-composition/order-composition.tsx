import React, {FC, useMemo} from "react";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";
// import {PriceWithCurrency, ThumbnailInCircle} from "components/shared/ui";

import {IOrder} from "../../models";
import {StatusDictionary} from "../../maps";

import styles from './order-composition.module.css'




interface IOrderCompositionProps {
    order: IOrder
    childrenPositions: React.ReactNode
    childrenCalcPrice: React.ReactNode
}

export const OrderComposition:FC<IOrderCompositionProps> = ({order, childrenPositions, childrenCalcPrice}) => {
    const date = new Date(order.createdAt)

    // const cardPositions = useMemo(()=>{
    //     const positions = ['','', '', '', '', '', '', '', '', '', '']
    //
    //     return positions.map((v, index)=>
    //         <div key={index} className={styles.card_position}>
    //             <div className={styles.card_position_caption}>
    //                 <ThumbnailInCircle image={DefaultImage}/>
    //                 <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
    //             </div>
    //             <PriceWithCurrency price={"4 x 551"} extraClassName="ml-4"/>
    //         </div>
    //     )
    // }, [])

    return (
        <>
            <p className="text text_type_digits-default">#{order.number}</p>
            <p className="text text_type_main-medium mt-10">{order.name}</p>
            <p className="text text_type_main-default mt-3">{StatusDictionary[order.status]}</p>
            <p className="text text_type_main-medium mt-15">Состав:</p>
            <div className={clx(styles.content_positions, [styles.box, "mt-6 pr-6"])}>
                {childrenPositions}
            </div>
            <div className={clx(styles.footer, ["mt-10"])}>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={date} />
                {childrenCalcPrice}
            </div>
        </>
    )
}