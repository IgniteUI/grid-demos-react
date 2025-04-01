interface IObject{
    [key:string] : FormDataEntryValue | IObject;
}
export function formDataToObject(form: HTMLFormElement): IObject {
    return Array.from((new FormData(form)).entries()).reduce((obj:IObject , pair) => {
        const [key, value] = pair;
        const keys = key.split('.');
        const last = keys.pop();
        let target = obj;
        // expand structure (if needed) and navigate to target:
        keys.forEach((k) => { target[k] ??= {}; target = target[k] as IObject; });
        target[last!] = value;
        return obj;
    }, {});
}