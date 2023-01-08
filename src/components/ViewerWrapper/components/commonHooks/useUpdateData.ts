import {Dispatch, useEffect} from "react";
import {type ViewerOptions} from 'tiny-viewer';
import set from 'lodash/set';

type UseUpdateData = {
    data: ViewerOptions,
    path: string,
    newValue: string | number | boolean,
    onUpdate: Dispatch<ViewerOptions>
}
const useUpdateData = ({data, path, newValue, onUpdate}: UseUpdateData) => {
    useEffect(function onDataUpdate() {
        const _data = {...data};
        set(_data, path, newValue);
        onUpdate(_data);
    }, [newValue])
}
export default useUpdateData;
