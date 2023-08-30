import {API_URL_INGREDIENTS} from "components/shared/configs/api";

export function fetchIngredients() {
    return fetch(API_URL_INGREDIENTS)
        .then((response) => {
            if (!response.ok)
                throw new Error(`HTTP error: ${response.status}`);
            return response.json()
        })
        .then((json) => {
            if (json && json.success && json.data)
                return json.data
            else
                throw new Error(`Response error: success - ${json && json.success}`);
        })
        .catch((reason) => {
            console.error(reason)
             throw new Error(reason)
        });
}
