import util from "util"

export const objectInspect = (obj) => {
    return util.inspect(obj, false, null, true)
}