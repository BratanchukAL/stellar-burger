import React, {useMemo} from 'react'

import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";
import {PriceWithCurrency, ThumbnailInCircle} from "components/shared/ui";

import styles from './order-card.module.css'


//TODO: drop
import DefaultImage from "@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png";

export const OrderCard = () => {
    const today = new Date()
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    )

    const thumbnailsOfIngredients = useMemo(()=>{
        const images: string[] | [] = [DefaultImage,DefaultImage,DefaultImage,DefaultImage,DefaultImage,DefaultImage,DefaultImage,DefaultImage,DefaultImage,DefaultImage]

        const maxShowItems = 6

        const notShowItems = images.length - maxShowItems
        const items = images.slice(0, maxShowItems)


        return items.map((v, index)=>
            <ThumbnailInCircle key={index}
                               image={DefaultImage}
                               extraStyles={{zIndex: images.length - index}}
                               countOfHidden={notShowItems}
                               isShowCount={(notShowItems > 0) && (index === items.length-1)}
            />
        )
    },[])

    return(
        <div className={clx(styles.content, ['p-6'])}>
            <div className={styles.item_info}>
                <p className="text text_type_digits-default">#034535</p>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={yesterday} />
            </div>
            <div className={clx(styles.item_info, ['pt-6'])}>
                <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
            </div>
            <div className={clx(styles.item_info, ['pt-2'])}>
                <p className="text text_type_main-default">Создан</p>
            </div>
            <div className={clx(styles.item_info, ['pt-6'])}>
                <div className={styles.content_images}>
                    {thumbnailsOfIngredients}
                </div>
                <div className="ml-6">
                    <PriceWithCurrency price={557}/>
                </div>
            </div>
        </div>
    )
}