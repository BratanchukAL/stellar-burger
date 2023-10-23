import React, {useMemo} from "react";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";
import {PriceWithCurrency, ThumbnailInCircle} from "components/shared/ui";

import styles from './order-composition.module.css'


//TODO: drop
import DefaultImage from "@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png";

export const OrderComposition = () => {
    const today = new Date()
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    )

    const cardPositions = useMemo(()=>{
        const positions = ['','', '', '', '', '', '', '', '', '', '']

        return positions.map((v, index)=>
            <div key={index} className={styles.card_position}>
                <div className={styles.card_position_caption}>
                    <ThumbnailInCircle image={DefaultImage}/>
                    <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
                </div>
                <PriceWithCurrency price={"4 x 551"} extraClassName="ml-4"/>
            </div>
        )
    }, [])

    return (
        <>
            <p className="text text_type_digits-default">#034535</p>
            <p className="text text_type_main-medium mt-10">Death Star Starship Main бургер</p>
            <p className="text text_type_main-default mt-3">Создан</p>
            <p className="text text_type_main-medium mt-15">Состав:</p>
            <div className={clx(styles.content_positions, [styles.box, "mt-6 pr-6"])}>
                {cardPositions}
            </div>
            <div className={clx(styles.footer, ["mt-10"])}>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={yesterday} />
                <PriceWithCurrency price={555}/>
            </div>
        </>
    )
}