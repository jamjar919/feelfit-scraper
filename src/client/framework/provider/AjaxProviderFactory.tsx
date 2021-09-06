import React, {useEffect, useState} from "react";
import {Path} from "../../../common/Path";

/**
 * Creates a generic provider that loads content from a JSON endpoint.
 * @param path          The Path to search
 * @param defaultValue  The default value of the context before it's filled.
 */
const getAjaxProvider = <T, >(
    path: Path,
    defaultValue: T
) => {

    const Context = React.createContext<T>(defaultValue);

    const Provider: React.FC = (props) => {
        const { children } = props;

        const [value, setValue] = useState<T>(defaultValue);

        useEffect(() => {
            setValue(defaultValue);

            fetch(path)
                .then((resp) => resp.json())
                .then((data) => setValue(data))
                .catch((error) => {
                    console.error(error);

                    setValue(defaultValue);
                })
        }, []);

        return (<Context.Provider value={value}>{children}</Context.Provider>)
    };

    const useProvider = () => React.useContext(Context);

    return {
        Provider,
        useProvider
    }
}

export { getAjaxProvider };