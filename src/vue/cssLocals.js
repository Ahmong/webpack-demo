
/**
 * Created by mzh on 17-7-2.
 */
import ScopedRoot from "./1-ScopedSelectors/ScopedRoot.vue"

var exportLocals = {};

Object.assign(exportLocals, ScopedRoot.locals);

// console.log('cssLocals= ', exportLocals);

module.exports.locals = exportLocals;
